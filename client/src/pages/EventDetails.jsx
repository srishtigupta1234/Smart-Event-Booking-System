import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../State/Event/Action";
import { bookEvent } from "../State/Booking/Action";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinIcon,
  CalendarDaysIcon,
  MinusIcon,
  PlusIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedEvent, loading } = useSelector((state) => state.event);

  const [seats, setSeats] = useState(1);
  const [ticketTier, setTicketTier] = useState("general");
  const [isBooking, setIsBooking] = useState(false);

  const basePrice =
    selectedEvent?.price != null ? Number(selectedEvent.price) : 49;
  const currentPrice = ticketTier === "vip" ? basePrice * 2.5 : basePrice;
  const totalPrice = currentPrice * seats;

  const eventImage = selectedEvent?.img;
  const isSoldOut = selectedEvent?.availableSeats === 0;

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  const handleBooking = async () => {
    if (seats > selectedEvent?.availableSeats) {
      toast.error("Not enough seats available");
      return;
    }

    setIsBooking(true);

    try {
      await dispatch(
        bookEvent(
          {
            eventId: selectedEvent.id,
            seats,
            bookingDate: new Date().toISOString(), 
          },
          navigate,
        ),
      );

      toast.success("Booking Successful! Preparing your tickets...");
      setTimeout(() => navigate("/success"), 2000);
    } catch {
      toast.error("Booking failed. Please try again.");
      setIsBooking(false);
    }
  };

  const incrementSeats = () => {
    if (seats < selectedEvent?.availableSeats && seats < 10)
      setSeats(seats + 1);
  };

  const decrementSeats = () => {
    if (seats > 1) setSeats(seats - 1);
  };

  if (loading || !selectedEvent) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#07050f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8938F2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold tracking-widest text-[#8938F2] uppercase">
            Loading Event
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07050f] text-gray-100 font-sans selection:bg-[#8938F2] selection:text-white">
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          {eventImage ? (
            <img
              src={eventImage}
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2a0e5c] to-[#0f0c20]"></div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#07050f] via-[#07050f]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-md ${
                  !isSoldOut
                    ? "bg-[#FDE067]/10 text-[#FDE067] border-[#FDE067]/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {!isSoldOut ? "Registration Open" : "Sold Out"}
              </span>
              <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                {selectedEvent.availableSeats} Seats Left
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 max-w-4xl drop-shadow-2xl">
              {selectedEvent.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-12"
        >

          <div className="flex flex-wrap gap-6 py-6 border-y border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#8938F2]">
                <CalendarDaysIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Date & Time</p>
                <p className="text-white font-bold text-lg">
                  {new Date(selectedEvent.date).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#8938F2]">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Location</p>
                <p className="text-white font-bold text-lg">
                  {selectedEvent.location}
                </p>
              </div>
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-[#FDE067]" />
              The Experience
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line font-medium">
              {selectedEvent.description ||
                "Join us for an unforgettable experience. Discover new insights, network with industry leaders, and secure your spot at one of the most anticipated events of the year."}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Venue</h3>
            <div className="h-[400px] w-full rounded-[2rem] overflow-hidden relative ring-1 ring-white/10 bg-[#111111]">
              <iframe
                title="Event Location"
                className="w-full h-full border-0 filter grayscale-[50%] contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedEvent.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
              {/* Subtle glass overlay tag */}
              <div className="absolute bottom-6 left-6 bg-[#07050f]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl">
                <p className="text-white font-bold flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-[#8938F2]" />
                  {selectedEvent.location}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-24 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
              Get Your Tickets
            </h3>

            <div className="mb-10 space-y-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setTicketTier("general")}
                className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 flex justify-between items-center ${
                  ticketTier === "general"
                    ? "bg-[#8938F2]/10 border-[#8938F2] shadow-[0_0_30px_rgba(137,56,242,0.15)]"
                    : "bg-white/5 border-white/5 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="font-bold text-white text-lg mb-1">
                    General Admission
                  </div>
                  <div className="text-sm text-gray-400">
                    Standard event access
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-white">
                  ${basePrice.toFixed(2)}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setTicketTier("vip")}
                className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 flex justify-between items-center relative overflow-hidden ${
                  ticketTier === "vip"
                    ? "bg-[#FDE067]/10 border-[#FDE067] shadow-[0_0_30px_rgba(253,224,103,0.15)]"
                    : "bg-white/5 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FDE067] to-[#f4b942] text-black text-[10px] font-extrabold px-4 py-1 rounded-bl-xl tracking-widest uppercase">
                  VIP
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1 flex items-center gap-2">
                    VIP Pass
                  </div>
                  <div className="text-sm text-gray-400">
                    Priority seating & backstage
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#FDE067]">
                  ${currentPrice.toFixed(2)}
                </div>
              </motion.div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-gray-400 mb-4">
                Select Quantity
              </label>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-full p-2">
                <button
                  onClick={decrementSeats}
                  disabled={seats <= 1}
                  className="w-12 h-12 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center justify-center transition-all"
                >
                  <MinusIcon className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <span className="text-3xl font-extrabold text-white w-16 text-center font-mono">
                  {seats}
                </span>
                <button
                  onClick={incrementSeats}
                  disabled={
                    seats >= selectedEvent.availableSeats || seats >= 10
                  }
                  className="w-12 h-12 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center justify-center transition-all"
                >
                  <PlusIcon className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-400 font-bold text-lg">Total</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={totalPrice}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="text-5xl font-extrabold text-white tracking-tighter"
                  >
                    ${totalPrice.toFixed(2)}
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: isSoldOut ? 1 : 1.03 }}
                whileTap={{ scale: isSoldOut ? 1 : 0.98 }}
                onClick={handleBooking}
                disabled={isSoldOut || isBooking}
                className={`w-full py-5 rounded-full font-extrabold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl group ${
                  isSoldOut
                    ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
                    : "bg-[#FDE067] text-black hover:bg-white hover:shadow-[0_0_40px_rgba(253,224,103,0.4)]"
                }`}
              >
                {isBooking ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : isSoldOut ? (
                  "Sold Out"
                ) : (
                  <>
                    Checkout Now
                    <span className="bg-black text-[#FDE067] p-1.5 rounded-full group-hover:bg-[#8938F2] group-hover:text-white transition-colors">
                      <ChevronRightIcon className="w-4 h-4" strokeWidth={3} />
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
