import React from 'react'
import { motion } from 'framer-motion'
const Speaker = () => {
  return (
   <>
     <section id="speakers" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold tracking-tighter mb-4">Meet all the top IT minds</h2>
              <p className="text-gray-400 text-lg">Explore our lineup of keynote speakers and industry leaders who will inspire and enlighten at the conference.</p>
            </div>
            <button className="mt-6 md:mt-0 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition">
              View All Speakers
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Marcus Elwood", role: "AI Scientist, NeuroCore Labs", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
              { name: "Jonathan Reyes", role: "Head of Cloud Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
              { name: "Daniel Kim", role: "Founder & CTO, DevSync", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
              { name: "Ahmed Faizal", role: "Lead Cybersecurity Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
            ].map((speaker, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-4 ring-1 ring-white/10">
                  <img src={speaker.img} alt={speaker.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500"/>
                </div>
                <h3 className="text-xl font-bold">{speaker.name}</h3>
                <p className="text-blue-400 text-sm mt-1">{speaker.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
   </>
  )
}

export default Speaker