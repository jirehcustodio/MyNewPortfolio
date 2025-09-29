"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import { TestimonialService, type Testimonial } from '../lib/supabase';

export default function LiveTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load testimonials on component mount
  useEffect(() => {
    loadTestimonials();
    
    // Subscribe to real-time updates
    const channel = TestimonialService.subscribeToTestimonials((updatedTestimonials) => {
      setTestimonials(updatedTestimonials);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000); // Change every 6 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const loadTestimonials = async () => {
    setIsLoading(true);
    const data = await TestimonialService.getApprovedTestimonials();
    setTestimonials(data);
    setIsLoading(false);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-neutral-900 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-neutral-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)] opacity-60" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Live Testimonials
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </h2>
          
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Real testimonials from real clients, updated in real-time. 
            Join the conversation and share your experience!
          </p>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {/* Testimonial Carousel */}
            <div className="relative bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-3xl p-8 lg:p-12 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-4xl text-blue-400/30 mx-auto mb-6" />
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-xl lg:text-2xl text-neutral-200 leading-relaxed mb-8 font-light">
                    &ldquo;{testimonials[currentIndex].testimonial}&rdquo;
                  </blockquote>
                  
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      {testimonials[currentIndex].name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    {testimonials[currentIndex].position && testimonials[currentIndex].company && (
                      <p className="text-neutral-400">
                        {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                      </p>
                    )}
                    {testimonials[currentIndex].project_type && (
                      <p className="text-blue-400 text-sm mt-2">
                        Project: {testimonials[currentIndex].project_type}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-neutral-700/50 hover:bg-neutral-600/50 border border-neutral-600/50 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <FaArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-neutral-700/50 hover:bg-neutral-600/50 border border-neutral-600/50 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Testimonial Indicators */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mb-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-400' : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-neutral-400 mb-8">
            <p className="text-lg">No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Add Testimonial Button */}
        <div className="text-center">
          <motion.button
            onClick={() => setShowSubmissionForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="w-4 h-4" />
            Share Your Experience
          </motion.button>
          <p className="text-neutral-500 text-sm mt-3">
            Your testimonial will be reviewed and appear live on the site
          </p>
        </div>

        {/* Testimonial Count */}
        {testimonials.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-neutral-500">
              Showing {currentIndex + 1} of {testimonials.length} testimonials
              {testimonials.length > 0 && (
                <span className="text-green-400 ml-2">
                  • Live updates enabled
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Testimonial Submission Modal */}
      {showSubmissionForm && (
        <TestimonialSubmissionModal
          onClose={() => setShowSubmissionForm(false)}
          onSubmitted={loadTestimonials}
        />
      )}
    </section>
  );
}

// Testimonial Submission Modal Component
interface TestimonialSubmissionModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

function TestimonialSubmissionModal({ onClose, onSubmitted }: TestimonialSubmissionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    testimonial: '',
    rating: 5,
    project_type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await TestimonialService.submitTestimonial(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        testimonial: '',
        rating: 5,
        project_type: '',
      });
      onSubmitted();
      setTimeout(() => onClose(), 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setIsSubmitting(false);
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`w-8 h-8 ${
              star <= formData.rating ? 'text-yellow-400' : 'text-gray-400'
            } hover:text-yellow-400 transition-colors`}
          >
            <FaStar className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-neutral-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-neutral-700 hover:bg-neutral-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Company and Position */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="Your job title"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-white font-medium mb-2">Project Type</label>
            <select
              value={formData.project_type}
              onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="">Select project type</option>
              <option value="Web Development">Web Development</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Database Design">Database Design</option>
              <option value="Cloud Migration">Cloud Migration</option>
              <option value="Security Audit">Security Audit</option>
              <option value="Performance Optimization">Performance Optimization</option>
              <option value="Consultation">Consultation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-white font-medium mb-2">Rating *</label>
            <div className="flex items-center gap-4">
              {renderStarRating()}
              <span className="text-neutral-400">{formData.rating} star{formData.rating !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-white font-medium mb-2">Your Testimonial *</label>
            <textarea
              required
              rows={5}
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none"
              placeholder="Share your experience working with Jireh. What was the outcome? How did the project help your business?"
              maxLength={500}
            />
            <div className="text-right text-neutral-500 text-sm mt-1">
              {formData.testimonial.length}/500 characters
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-900/30 border border-green-600/30 text-green-400' : 'bg-red-900/30 border border-red-600/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </div>
        </form>

        <p className="text-neutral-500 text-sm text-center mt-4">
          All testimonials are reviewed before being published to maintain quality and authenticity.
        </p>
      </motion.div>
    </motion.div>
  );
}