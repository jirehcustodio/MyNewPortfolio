// Authentication service for TaskFlow Pro
// Handles user login, registration, and session management

import DatabaseService, { UserAccount, UserSession } from './databaseService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserAccount;
  sessionId?: string;
  error?: string;
}

class AuthService {
  private static instance: AuthService;
  private dbService: DatabaseService;
  private currentUser: UserAccount | null = null;
  private currentSessionId: string | null = null;

  private constructor() {
    this.dbService = DatabaseService.getInstance();
    this.initializeAuth();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async initializeAuth() {
    // Check for existing session on startup
    const sessionId = localStorage.getItem('taskflow-session-id');
    if (sessionId) {
      await this.validateSession(sessionId);
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.dbService.getUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        };
      }

      // Hash password (in production, use proper hashing like bcrypt)
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user account
      const user = await this.dbService.createUser({
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
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
      });

      // Create session
      const session = await this.createUserSession(user.id);

      // Set current user and session
      this.currentUser = user;
      this.currentSessionId = session.sessionId;

      // Store session in localStorage
      localStorage.setItem('taskflow-session-id', session.sessionId);
      localStorage.setItem('taskflow-user-id', user.id);

      return {
        success: true,
        user,
        sessionId: session.sessionId
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Get user by email
      const user = await this.dbService.getUserByEmail(credentials.email);
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(credentials.password, user.password || '');
      if (!isValidPassword) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Create new session
      const session = await this.createUserSession(user.id);

      // Set current user and session
      this.currentUser = user;
      this.currentSessionId = session.sessionId;

      // Store session in localStorage
      localStorage.setItem('taskflow-session-id', session.sessionId);
      localStorage.setItem('taskflow-user-id', user.id);

      return {
        success: true,
        user,
        sessionId: session.sessionId
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Delete current session
      if (this.currentSessionId) {
        await this.dbService.deleteSession(this.currentSessionId);
      }

      // Clear local state
      this.currentUser = null;
      this.currentSessionId = null;

      // Clear localStorage
      localStorage.removeItem('taskflow-session-id');
      localStorage.removeItem('taskflow-user-id');

    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async validateSession(sessionId: string): Promise<boolean> {
    try {
      const session = await this.dbService.getValidSession(sessionId);
      if (!session) {
        // Session expired or invalid
        this.logout();
        return false;
      }

      // Get user data
      const user = await this.dbService.getUserById(session.userId);
      if (!user) {
        this.logout();
        return false;
      }

      // Set current user and session
      this.currentUser = user;
      this.currentSessionId = sessionId;

      return true;

    } catch (error) {
      console.error('Session validation error:', error);
      this.logout();
      return false;
    }
  }

  private async createUserSession(userId: string): Promise<UserSession> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    return this.dbService.createSession({
      userId,
      expiresAt,
      device: this.getDeviceInfo(),
      ipAddress: 'localhost' // In production, get real IP
    });
  }

  private async hashPassword(password: string): Promise<string> {
    // Simple hash for demo - use proper hashing in production
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'taskflow-salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const inputHash = await this.hashPassword(password);
    return inputHash === hashedPassword;
  }

  private generateDefaultAvatar(name: string): string {
    // Generate a simple avatar URL based on name
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff&size=128&bold=true`;
  }

  private getDeviceInfo(): string {
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'Unknown';
    const platform = typeof window !== 'undefined' ? navigator.platform : 'Unknown';
    return `${platform} - ${userAgent.slice(0, 50)}`;
  }

  // Getters
  getCurrentUser(): UserAccount | null {
    return this.currentUser;
  }

  getCurrentSessionId(): string | null {
    return this.currentSessionId;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentSessionId !== null;
  }

  // Guest Mode
  async createGuestSession(): Promise<AuthResponse> {
    try {
      const guestUser: UserAccount = {
        id: 'guest-' + Date.now(),
        email: 'guest@taskflow.local',
        name: 'Guest User',
        avatar: this.generateDefaultAvatar('Guest User'),
        createdAt: new Date(),
        updatedAt: new Date(),
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
      this.currentSessionId = 'guest-session-' + Date.now();

      // Store in localStorage for guest session
      localStorage.setItem('taskflow-guest-mode', 'true');
      localStorage.setItem('taskflow-guest-user', JSON.stringify(guestUser));

      return {
        success: true,
        user: guestUser,
        sessionId: this.currentSessionId
      };

    } catch (error) {
      console.error('Guest session error:', error);
      return {
        success: false,
        error: 'Failed to create guest session'
      };
    }
  }

  isGuestMode(): boolean {
    return localStorage.getItem('taskflow-guest-mode') === 'true';
  }

  // Password Reset (placeholder for future implementation)
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    // In production, this would send an email with reset link
    console.log('Password reset requested for:', email);
    return {
      success: true,
      message: 'Password reset link would be sent to your email'
    };
  }

  async resetPassword(token: string, _newPassword: string): Promise<{ success: boolean; message: string }> {
    // In production, this would validate the token and update password
    console.log('Password reset for token:', token);
    return {
      success: true,
      message: 'Password updated successfully'
    };
  }
}

export default AuthService;