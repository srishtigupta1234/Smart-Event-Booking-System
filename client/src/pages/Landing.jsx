import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Hero from "../components/Hero";
import About from "../components/About";
import Speaker from "../components/Speaker";


export default function LandingPage() {
  return (
    <div className="relative bg-[#020202] min-h-screen text-white font-sans overflow-hidden selection:bg-blue-500 selection:text-white">

      <div className="fixed inset-0 z-0 pointer-events-none">

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]"></div>

        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Hero />

        <About />

        <Speaker />

        <section
          id="schedule"
          className="py-24 bg-white/[0.02] border-y border-white/5 px-6 backdrop-blur-md"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold tracking-tighter mb-4 text-center">
              Organize your schedule
            </h2>
            <p className="text-gray-400 text-lg text-center mb-16">
              Explore our lineup of keynote speakers and industry leaders.
            </p>

            <div className="space-y-6">
              {[
                {
                  time: "09:00 - 10:00 am",
                  title: "Opening",
                  desc: "Kick off the day with a warm welcome from the host. We'll walk through the schedule, introduce key speakers, and set the tone.",
                },
                {
                  time: "10:30 - 11:50 am",
                  title: "Keynote: The Future of Tech",
                  desc: "A visionary talk by our headline speaker on where technology is heading—AI, SaaS, and innovation in the digital age.",
                  speakers: ["Tomislav P.", "Ethan Zhao"],
                },
                {
                  time: "12:00 - 12:50 pm",
                  title: "Live App Showcase",
                  desc: "See demos of exciting new SaaS products, apps, and platforms. A mix of startup spotlights and enterprise innovation.",
                  speakers: ["John Anderson"],
                },
              ].map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl flex flex-col md:flex-row gap-8 border border-white/5 hover:border-white/20 transition"
                >
                  <div className="md:w-1/4 flex items-start gap-2 text-blue-400 font-mono">
                    <Clock size={18} className="mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {event.desc}
                    </p>
                    {event.speakers && (
                      <div className="flex gap-4">
                        {event.speakers.map((s) => (
                          <span
                            key={s}
                            className="text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">
              Pricing for tickets
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the perfect tier for your conference experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col hover:border-white/20 transition">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="text-5xl font-extrabold mb-6">$99</div>
              <p className="text-gray-400 mb-8 border-b border-white/10 pb-8">
                Get a seat and explore our lineup of keynote speakers and
                industry leaders.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Full event access",
                  "Access to keynote & breakout sessions",
                  "Networking opportunities",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={20} className="text-blue-500/80" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-full font-semibold hover:bg-white hover:text-black transition">
                Buy Ticket
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-md p-10 rounded-3xl border border-blue-500/30 flex flex-col relative overflow-hidden shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] hover:border-blue-500/50 transition">
              <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-5xl font-extrabold mb-6">$399</div>
              <p className="text-gray-400 mb-8 border-b border-white/10 pb-8">
                Get VIP access, exclusive perks, and recordings.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Full event access",
                  "Access to keynote & breakout sessions",
                  "Networking opportunities",
                  "Access to post-event session recordings",
                  "Conference materials and swag bag",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={20} className="text-blue-500" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Buy Premium Ticket
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
