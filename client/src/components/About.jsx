import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <>
        <section id="about" className="py-24 bg-white/[0.02] border-y border-white/5 px-6 backdrop-blur-md">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold tracking-tighter mb-6">About <br/>Summitra 2025</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Summitra 2025 is an immersive IT Conference over the course of three days, August 13-15. Our mission is to tackle the challenges of modern engineering, AI, and cloud architecture. 
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                A person's success is measured by the way they approach challenges. Join us to reshape your approach to tech.
              </p>
            </motion.div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden ring-1 ring-white/10">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Conference Audience" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

    </>
  )
}

export default About