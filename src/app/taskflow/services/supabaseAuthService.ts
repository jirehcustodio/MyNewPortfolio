// Supabase Authentication Service for TaskFlow Pro
// Replaces IndexedDB with cloud database for production deployment

import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export interface SupabaseUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  preferences: {
    theme: 'dark' | 'light';
    defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
    language: string;
    timezone: string;
    notificationSettings: {
      dueDateReminders: boolean;
      overdueAlerts: boolean;
      dailyReminders: boolean;
      taskAssignments: boolean;
      reminderTime: string;
      advanceNotice: number;
    };
  };
  subscription: {
    plan: 'free' | 'pro' | 'team';
    status: 'active' | 'inactive' | 'cancelled';
  };
}

export interface AuthResponse {
  success: boolean;
  user?: SupabaseUser;
  session?: Session;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

class SupabaseAuthService {
  private static instance: SupabaseAuthService;
  private currentUser: SupabaseUser | null = null;
  private currentSession: Session | null = null;

  private constructor() {
    // Initialize auth state listener
    this.initializeAuthListener();
  }

  public static getInstance(): SupabaseAuthService {
    if (!SupabaseAuthService.instance) {
      SupabaseAuthService.instance = new SupabaseAuthService();
    }
    return SupabaseAuthService.instance;
  }

  private initializeAuthListener() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (session?.user) {
        await this.loadUserProfile(session.user.id);
        this.currentSession = session;
      } else {
        this.currentUser = null;
        this.currentSession = null;
      }
    });
  }

  private async loadUserProfile(userId: string): Promise<void> {
    try {
      console.log('🔍 Loading user profile for:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error loading user profile:', error);
        
        if (error.code === 'PGRST116') {
          console.log('📋 Users table not found. Database setup may be required.');
        } else if (error.code === 'PGRST118') {
          console.log('👤 User profile not found in database. Creating default profile...');
          // User exists in auth but not in our users table - create it
          await this.createMissingUserProfile(userId);
        }
        return;
      }

      if (data) {
        console.log('✅ User profile loaded successfully');
        this.currentUser = data as SupabaseUser;
      }
    } catch (error) {
      console.error('❌ Error loading user profile:', error);
    }
  }

  private async createMissingUserProfile(userId: string): Promise<void> {
    try {
      // Get user info from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const userProfile = {
        id: userId,
        email: user.email || '',
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        avatar: this.generateDefaultAvatar(user.user_metadata?.name || 'User'),
        preferences: {
          theme: 'dark',
          defaultPriority: 'medium',
          language: 'en',
          timezone: 'UTC',
          notificationSettings: {
            dueDateReminders: true,
            overdueAlerts: true,
            dailyReminders: true,
            taskAssignments: true,
            reminderTime: '09:00',
            advanceNotice: 24
          }
        },
        subscription: {
          plan: 'free',
          status: 'active'
        }
      };

      const { error } = await supabase
        .from('users')
        .insert(userProfile);

      if (error) {
        console.error('❌ Failed to create missing user profile:', error);
      } else {
        console.log('✅ Created missing user profile');
        this.currentUser = userProfile as SupabaseUser;
      }
    } catch (error) {
      console.error('❌ Error creating missing user profile:', error);
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      console.log('🚀 Starting registration process...');
      
      // Check if Supabase is properly configured
      if (!hasValidSupabaseConfig) {
        console.log('⚠️ Supabase not configured, using demo mode');
        // Fall back to guest mode for demo purposes
        return this.createGuestSession(`${userData.name} (Demo)`);
      }

      console.log('📡 Registering with Supabase Auth...');
      
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });

      if (authError) {
        console.error('❌ Supabase auth error:', authError);
        // Fall back to guest mode if Supabase fails
        return this.createGuestSession(`${userData.name} (Demo)`);
      }

      if (!authData.user) {
        console.log('⚠️ No user data returned, using demo mode');
        return this.createGuestSession(`${userData.name} (Demo)`);
      }

      console.log('✅ User registered successfully:', authData.user.email);

      // Create user profile in our users table
      const userProfile: Partial<SupabaseUser> = {
        id: authData.user.id,
        email: userData.email,
        name: userData.name,
        avatar: this.generateDefaultAvatar(userData.name),
        preferences: {
          theme: 'dark',
          defaultPriority: 'medium',
          language: 'en',
          timezone: 'UTC',
          notificationSettings: {
            dueDateReminders: true,
            overdueAlerts: true,
            dailyReminders: true,
            taskAssignments: true,
            reminderTime: '09:00',
            advanceNotice: 24
          }
        },
        subscription: {
          plan: 'free',
          status: 'active'
        }
      };

      console.log('💾 Creating user profile in database...');
      
      const { error: profileError } = await supabase
        .from('users')
        .upsert(userProfile);

      if (profileError) {
        console.error('❌ Error creating user profile:', profileError);
        
        // Check if it's a table not found error
        if (profileError.code === 'PGRST116') {
          console.log('📋 Users table not found. Database setup may be required.');
          console.log('Please check the SUPABASE_SETUP.md file for setup instructions.');
        }
        
        // Continue anyway - profile can be created later
        console.log('⚠️ Continuing without profile creation...');
      } else {
        console.log('✅ User profile created successfully');
      }

      // Set current user
      this.currentUser = userProfile as SupabaseUser;

      return {
        success: true,
        user: userProfile as SupabaseUser,
        session: authData.session || undefined
      };

    } catch (error) {
      console.error('❌ Registration error:', error);
      // Fall back to guest mode if there's a network error
      return this.createGuestSession(`${userData.name} (Demo)`);
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('🚀 Starting login process...');
      
      // Check if Supabase is properly configured
      if (!hasValidSupabaseConfig) {
        console.log('⚠️ Supabase not configured, using demo mode');
        // Fall back to guest mode for demo purposes
        return this.createGuestSession('Demo User');
      }

      console.log('📡 Authenticating with Supabase...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        console.error('❌ Supabase auth error:', error);
        // Fall back to guest mode if Supabase fails
        return this.createGuestSession('Demo User');
      }

      if (!data.user || !data.session) {
        console.log('⚠️ No user/session data returned, using demo mode');
        return this.createGuestSession('Demo User');
      }

      console.log('✅ User authenticated successfully:', data.user.email);

      // Load user profile
      console.log('💾 Loading user profile...');
      await this.loadUserProfile(data.user.id);

      return {
        success: true,
        user: this.currentUser || undefined,
        session: data.session
      };

    } catch (error) {
      console.error('❌ Login error:', error);
      // Fall back to guest mode if there's a network error
      return this.createGuestSession('Demo User');
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      
      this.currentUser = null;
      this.currentSession = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      this.currentSession = session;
      
      if (session?.user && !this.currentUser) {
        await this.loadUserProfile(session.user.id);
      }
      
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  getCurrentUser(): SupabaseUser | null {
    return this.currentUser;
  }

  async updateUserProfile(updates: Partial<SupabaseUser>): Promise<AuthResponse> {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'No user logged in'
        };
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', this.currentUser.id)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      this.currentUser = data as SupabaseUser;

      return {
        success: true,
        user: this.currentUser
      };

    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  }

  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/taskflow/reset-password`
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true
      };

    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: 'Failed to send reset email'
      };
    }
  }

  // Guest mode for demo purposes
  async createGuestSession(guestName?: string): Promise<AuthResponse> {
    const name = guestName || 'Guest User';
    const guestUser: SupabaseUser = {
      id: 'guest-' + Date.now(),
      email: 'guest@taskflow.local',
      name: name,
      avatar: this.generateDefaultAvatar(name),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        defaultPriority: 'medium',
        language: 'en',
        timezone: 'UTC',
        notificationSettings: {
          dueDateReminders: true,
          overdueAlerts: true,
          dailyReminders: true,
          taskAssignments: true,
          reminderTime: '09:00',
          advanceNotice: 24
        }
      },
      subscription: {
        plan: 'free',
        status: 'active'
      }
    };

    this.currentUser = guestUser;

    // Store guest mode in localStorage
    localStorage.setItem('taskflow-guest-mode', 'true');
    localStorage.setItem('taskflow-guest-user', JSON.stringify(guestUser));

    return {
      success: true,
      user: guestUser
    };
  }

  isGuestMode(): boolean {
    return localStorage.getItem('taskflow-guest-mode') === 'true';
  }

  private generateDefaultAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff&size=128`;
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getCurrentSession();
    return !!session || this.isGuestMode();
  }
}

export default SupabaseAuthService;