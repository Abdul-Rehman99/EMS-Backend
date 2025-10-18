import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Zap, Star, ArrowRight, CheckCircle, Menu, X } from 'lucide-react';

export default function EventifyLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const featuresY = useTransform(scrollYProgress, [0.2, 0.6], [100, -100]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Calendar, title: "Smart Scheduling", desc: "AI-powered event planning that adapts to your needs" },
    { icon: Users, title: "Team Collaboration", desc: "Seamless coordination with unlimited team members" },
    { icon: Zap, title: "Instant Updates", desc: "Real-time notifications keep everyone in sync" },
    { icon: Star, title: "Premium Analytics", desc: "Deep insights into event performance and engagement" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Event Director", text: "Eventify transformed how we manage conferences. 10/10!" },
    { name: "Marcus Rodriguez", role: "Wedding Planner", text: "The best investment for my business. Clients love it." },
    { name: "Emily Watson", role: "Corporate Manager", text: "Seamless experience from planning to execution." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Eventify
          </motion.div>
          
          <div className="hidden md:flex gap-8 items-center">
            {['Features', 'Pricing', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-slate-800/95 backdrop-blur-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {['Features', 'Pricing', 'About', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transform Your Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate event management platform that brings your vision to life with seamless planning, coordination, and execution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-400/10 transition-colors"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "50K+", label: "Events Managed" },
                  { number: "98%", label: "Success Rate" },
                  { number: "200+", label: "Countries" },
                  { number: "4.9/5", label: "User Rating" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section with Parallax */}
      <motion.section style={{ y: featuresY }} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-xl">Everything you need to create unforgettable events</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer"
                style={{ transform: `translateY(${scrollY * 0.02 * (i + 1)}px)` }}
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Loved by Event Professionals</h2>
            <p className="text-gray-400 text-xl">Join thousands of satisfied users worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-900/50 to-slate-800/50 p-8 rounded-2xl border border-purple-500/20"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Ready to Eventify Your Vision?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your free 14-day trial today. No credit card required.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-5 rounded-full font-bold text-xl inline-flex items-center gap-3"
            >
              Get Started for Free
              <ArrowRight className="w-6 h-6" />
            </motion.button>

            <div className="flex justify-center gap-8 mt-12 text-sm text-gray-400">
              {['No credit card', 'Cancel anytime', '24/7 support'].map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-purple-500/20 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Eventify
          </div>
          <p className="text-gray-400 mb-6">Making every event extraordinary</p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">© 2025 Eventify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}