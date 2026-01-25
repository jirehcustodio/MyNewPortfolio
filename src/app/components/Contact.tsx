"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const contactMethods = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "jireh4401@gmail.com",
    link: "mailto:jireh4401@gmail.com",
    color: "#b8814a"
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "09630030380",
    link: "tel:+639630030380",
    color: "#b8814a"
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/jireh-custodio-19a492341",
    link: "https://www.linkedin.com/in/jireh-custodio-19a492341/",
    color: "#b8814a"
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "github.com/jirehcustodio",
    link: "https://github.com/jirehcustodio",
    color: "#b8814a"
  }
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  return (
    <section id="contact" className="relative py-12 sm:py-16 lg:py-32 overflow-hidden bg-neutral-50">
      {/* Minimal Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white border border-neutral-200 rounded-full text-neutral-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <span className="w-2 h-2 bg-[#b8814a] rounded-full animate-pulse" />
            Let&apos;s Connect
          </motion.div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2 text-neutral-900">
            Get In Touch
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Let&apos;s Start a Conversation</h4>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                I&apos;m always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-3 sm:gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  className="group relative p-3 sm:p-4 bg-white border border-neutral-200 rounded-xl sm:rounded-2xl overflow-hidden touch-manipulation shadow-sm"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "#b8814a"
                  }}
                  whileTap={{ scale: 0.98 }}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b8814a] rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                    
                    <div className="min-w-0 flex-1">
                      <h5 className="font-semibold text-neutral-900 group-hover:text-[#b8814a] transition-colors text-sm sm:text-base">
                        {method.title}
                      </h5>
                      <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors text-xs sm:text-sm truncate">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="p-4 sm:p-6 bg-white border border-[#b8814a]/30 rounded-xl sm:rounded-2xl shadow-sm"
            >
              <h5 className="font-semibold text-neutral-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-[#b8814a] rounded-full animate-pulse" />
                Quick Response Time
              </h5>
              <p className="text-neutral-600 text-xs sm:text-sm">
                I typically respond to messages within 24 hours. Looking forward to hearing from you!
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form
              className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-sm"
              action="https://formsubmit.co/jireh4401@gmail.com"
              method="POST"
            >
              {/* Hidden inputs for FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://jirehdevportfolio.netlify.app/contact-success" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_autoresponse" value="Thank you for contacting Jireh! Your message has been received and I will get back to you within 24 hours." />
              <input type="text" name="_honey" style={{ display: 'none' }} />
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 sm:p-4 bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none transition-all duration-300 text-base"
                  whileFocus={{ 
                    scale: 1.01,
                    borderColor: "#b8814a",
                    boxShadow: "0 0 0 3px rgba(184, 129, 74, 0.1)"
                  }}
                />
                <motion.div
                  className="h-1 bg-[#b8814a] rounded-full mt-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 sm:p-4 bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none transition-all duration-300 text-base"
                  whileFocus={{ 
                    scale: 1.01,
                    borderColor: "#b8814a",
                    boxShadow: "0 0 0 3px rgba(184, 129, 74, 0.1)"
                  }}
                />
                <motion.div
                  className="h-1 bg-[#b8814a] rounded-full mt-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 sm:p-4 bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none transition-all duration-300 resize-none text-base"
                  whileFocus={{ 
                    scale: 1.01,
                    borderColor: "#b8814a",
                    boxShadow: "0 0 0 3px rgba(184, 129, 74, 0.1)"
                  }}
                />
                <motion.div
                  className="h-1 bg-[#b8814a] rounded-full mt-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(184, 129, 74, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white relative overflow-hidden transition-all duration-300 text-base touch-manipulation bg-[#b8814a] hover:bg-[#a07241]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}