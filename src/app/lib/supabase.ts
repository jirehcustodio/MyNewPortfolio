// Supabase configuration for testimonials
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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