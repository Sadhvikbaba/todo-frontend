"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Moon, List, ArrowRight, GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

export default function Home() {
  const [stars, setStars] = useState([]);
  
  // Generate random stars
  useEffect(() => {
    const newStars = Array(100).fill().map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDuration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-blue-950 text-white relative overflow-hidden">
      <Head>
        <title>NightTask | Organize Your Universe</title>
        <meta name="description" content="A beautiful todo app with night sky theme" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Stars background */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full z-0"
          style={{
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: -10,
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: star.animationDuration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Moon className="text-blue-300 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">NightTask</span>
          </div>
          <nav>
            <ul className="flex space-x-6 not-sm:hidden">
              <li><a href="#" className="hover:text-purple-300 transition">Features</a></li>
              <li><a href="#" className="hover:text-purple-300 transition">Testimonials</a></li>
              <li><a href="#" className="hover:text-purple-300 transition">Pricing</a></li>
            </ul>
          </nav>
        </header>

        <main>
          {/* Hero section */}
          <section className="py-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Organize Your Tasks<br />Under the Night Sky
              </h1>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                A beautiful todo app inspired by the cosmos. Stay organized with a serene night-themed experience that helps you focus and achieve more.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/login">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-full transition flex items-center">
                    Get Started <ArrowRight size={20} className="ml-2" />
                  </button>
                </Link>
                <Link href="/login">
                  <button className="bg-transparent border border-purple-400 text-purple-300 font-medium py-3 px-8 rounded-full hover:bg-purple-900/20 transition">
                    Try Demo
                  </button>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* App preview section */}
          <section className="py-16">
            <div className="relative mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gray-900/60 p-6 rounded-2xl border border-purple-500/20 shadow-2xl backdrop-blur-md"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    <Moon className="text-purple-400 mr-2" size={24} />
                    <h3 className="text-2xl font-semibold text-blue-100">My Tasks</h3>
                  </div>
                  <div className="flex space-x-2">
                    <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                    <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                    <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-900/30 p-4 rounded-lg flex items-center justify-between border border-blue-500/20">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-400 mr-3" size={20} />
                      <span>Review project requirements</span>
                    </div>
                    <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">Completed</span>
                  </div>
                  
                  <div className="bg-purple-900/30 p-4 rounded-lg flex items-center justify-between border border-purple-500/20">
                    <div className="flex items-center">
                      <List className="text-purple-400 mr-3" size={20} />
                      <span>Design landing page mockup</span>
                    </div>
                    <span className="text-xs bg-purple-500/20 px-2 py-1 rounded">In Progress</span>
                  </div>
                  
                  <div className="bg-indigo-900/30 p-4 rounded-lg flex items-center justify-between border border-indigo-500/20">
                    <div className="flex items-center">
                      <List className="text-blue-300 mr-3" size={20} />
                      <span>Implement Next.js components</span>
                    </div>
                    <span className="text-xs bg-indigo-500/20 px-2 py-1 rounded">Upcoming</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features section */}
          <section id="features" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Stellar Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-900/40 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm"
              >
                <Star className="text-yellow-300 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3 text-blue-200">Cosmic Organization</h3>
                <p className="text-blue-100/80">Organize tasks with our intuitive star-rating system. Prioritize what matters most with celestial clarity.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-900/40 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm"
              >
                <Moon className="text-purple-300 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3 text-purple-200">Dark Mode Focus</h3>
                <p className="text-purple-100/80">Our night-themed interface reduces eye strain and helps you focus on your tasks without distractions.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-900/40 p-6 rounded-xl border border-indigo-500/20 backdrop-blur-sm"
              >
                <CheckCircle className="text-green-300 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3 text-green-200">Achievement Constellations</h3>
                <p className="text-green-100/80">Watch your completed tasks form beautiful constellations, turning productivity into visual art.</p>
              </motion.div>
            </div>
          </section>

          {/* Call to action */}
          <section className="py-16 my-10">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-10 text-center backdrop-blur-sm border border-blue-500/20">
              <h2 className="text-3xl font-bold mb-6">Ready to Navigate Your Tasks?</h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of stargazers who ve transformed their productivity with our cosmic todo application.
              </p>
              <Link href="/login">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-8 rounded-full transition">
                  Start Your Journey
                </button>
              </Link>
            </div>
          </section>
        </main>

        <footer className="py-10 text-center text-blue-200/60">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://github.com/Sadhvikbaba" className="hover:text-purple-300 transition" target='_blank'><span className="sr-only"><GithubIcon/></span><GithubIcon/></a>
            <a href="https://www.instagram.com/sadhvikbaba" className="hover:text-purple-300 transition" target='_blank'><span className="sr-only" ><InstagramIcon/></span><InstagramIcon/></a>
            <a href="https://www.linkedin.com/in/sadhvik-baba-patibandla-563964278" className="hover:text-purple-300 transition" target='_blank'><span className="sr-only"><LinkedinIcon/></span><LinkedinIcon/></a>
          </div>
          <p>&copy; 2025 NightTask. All rights reserved by sadhvik baba patibandla.</p>
        </footer>
      </div>
    </div>
  );
}