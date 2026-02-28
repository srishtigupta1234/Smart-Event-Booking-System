import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

const HeroSection = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#8938F2] font-sans flex flex-col justify-center">
      <div className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full border-[80px] md:border-[120px] border-[#9D54F6] opacity-80 pointer-events-none"></div>
      <div className="absolute top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full border-[80px] md:border-[120px] border-[#9D54F6] opacity-80 pointer-events-none"></div>
    
      <main className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full pt-10">
        
   
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg"
        >
          <CalendarDaysIcon className="w-5 h-5 text-[#FDE067]" />
          Registrations Open For 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#FDE067] text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight drop-shadow-sm"
        >
          Code. Connect. Create.
          <br />
          <span className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mt-2 block tracking-tight">One Epic Conference</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed"
        >
          Explore our lineup of keynote speakers and industry leaders who will inspire, challenge, and enlighten you at this year's premier tech summit.
        </motion.p>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 md:gap-8 mt-12 mb-10"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/30 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-3xl md:text-5xl font-extrabold font-mono tracking-tighter drop-shadow-md">
                  {item.value}
                </span>
              </div>
              <span className="text-[#FDE067] text-xs md:text-sm uppercase tracking-widest mt-3 font-bold">{item.label}</span>
            </div>
          ))}
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-6"
        >
    
          <button
            onClick={() => navigate("/events")}
            className="group bg-white text-black pl-8 pr-2 py-2.5 rounded-full flex items-center gap-6 font-extrabold text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            Buy Tickets
            <span className="bg-[#8938F2] text-white p-2.5 rounded-full group-hover:bg-black transition-colors">
              <ChevronRightIcon className="w-5 h-5" strokeWidth={3} />
            </span>
          </button>
          
         
          <div className="flex items-center gap-3 bg-[#FDE067] px-6 py-3.5 rounded-full text-black text-sm font-bold shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform cursor-default">
            <span className="bg-black text-[#FDE067] p-1.5 rounded-full">
              <MapPinIcon className="w-4 h-4" strokeWidth={2.5} />
            </span>
            Elgin Celina, Delaware
          </div>
        </motion.div>
      </main>

    
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-20 h-10 w-full"
      ></motion.div>
    </div>
  );
};

export default HeroSection;