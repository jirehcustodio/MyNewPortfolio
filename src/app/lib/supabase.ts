// Supabase configuration for testimonials
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://demo-project.supabase.co' &&
  supabaseAnonKey !== 'demo-key';

export const supabase = hasValidSupabaseConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for testimonials
export interface Testimonial {
  id: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
  testimonial: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  project_type?: string;
  avatar_url?: string;
}

export interface TestimonialSubmission {
  name: string;
  email: string;
  company?: string;
  position?: string;
  testimonial: string;
  rating: number;
  project_type?: string;
}

// Testimonial service functions
export class TestimonialService {
  // Submit a new testimonial
  static async submitTestimonial(data: TestimonialSubmission): Promise<{ success: boolean; message: string; testimonial?: Testimonial }> {
    if (!supabase) {
      return { 
        success: false, 
        message: 'Testimonial system is currently unavailable. Please contact directly via email.' 
      };
    }

    try {
      const { data: testimonial, error } = await supabase
        .from('testimonials')
        .insert([{
          ...data,
          status: 'pending', // All testimonials start as pending for moderation
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        console.error('Error submitting testimonial:', error);
        return { success: false, message: 'Failed to submit testimonial. Please try again.' };
      }

      return { 
        success: true, 
        message: 'Thank you! Your testimonial has been submitted and will appear after review.',
        testimonial 
      };
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Get approved testimonials
  static async getApprovedTestimonials(): Promise<Testimonial[]> {
    if (!supabase) {
      // Return sample testimonials when Supabase is not configured
      return [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@techcorp.com',
          company: 'TechCorp Solutions',
          position: 'CTO',
          testimonial: 'Jireh delivered an exceptional e-commerce platform that exceeded all our expectations. The performance optimizations resulted in a 40% increase in conversion rates, and the clean, maintainable code made future updates seamless.',
          rating: 5,
          project_type: 'E-commerce',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'mike@startupco.io',
          company: 'StartupCo',
          position: 'Founder',
          testimonial: 'Working with Jireh was a game-changer for our startup. He not only built our MVP in record time but also provided valuable insights on scalability and user experience. The real-time features he implemented have become our key differentiator.',
          rating: 5,
          project_type: 'Web Development',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily@digitalagency.com',
          company: 'Digital Agency Pro',
          position: 'Project Manager',
          testimonial: 'Jireh\'s expertise in Next.js and database optimization helped us migrate our legacy system to a modern, high-performance platform. His attention to detail and proactive communication made the entire process smooth and stress-free.',
          rating: 5,
          project_type: 'Cloud Migration',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];
    }

    try {
      const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
      }

      return testimonials || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  // Subscribe to real-time testimonial updates
  static subscribeToTestimonials(callback: (testimonials: Testimonial[]) => void) {
    if (!supabase) {
      // Return a mock channel when Supabase is not configured
      return {
        unsubscribe: () => {}
      };
    }

    const channel = supabase
      .channel('testimonials')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'testimonials',
          filter: 'status=eq.approved'
        },
        () => {
          // Fetch updated testimonials when changes occur
          this.getApprovedTestimonials().then(callback);
        }
      )
      .subscribe();

    return channel;
  }

  // Moderate testimonials (for admin use)
  static async moderateTestimonial(id: string, status: 'approved' | 'rejected'): Promise<boolean> {
    if (!supabase) {
      console.warn('Supabase not configured - cannot moderate testimonials');
      return false;
    }

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);

      if (error) {
        console.error('Error moderating testimonial:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error moderating testimonial:', error);
      return false;
    }
  }

  // Get pending testimonials (for admin)
  static async getPendingTestimonials(): Promise<Testimonial[]> {
    if (!supabase) {
      return [];
    }

    try {
      const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching pending testimonials:', error);
        return [];
      }

      return testimonials || [];
    } catch (error) {
      console.error('Error fetching pending testimonials:', error);
      return [];
    }
  }
}