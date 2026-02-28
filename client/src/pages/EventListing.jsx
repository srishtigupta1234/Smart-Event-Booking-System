import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../State/Event/Action";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { 
  MagnifyingGlassIcon, 
  CalendarIcon as HeroCalendarIcon, 
  MapPinIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const SearchIcon = () => (
  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
);

const CalendarIcon = () => (
  <HeroCalendarIcon className="w-5 h-5 text-gray-400" /> 
);

const LocationIcon = () => (
  <MapPinIcon className="w-5 h-5 text-indigo-400 mt-0.5" />
);

const PriceIcon = () => (
  <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function EventListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.event);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const filteredEvents =
    events?.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = selectedDate
        ? event.date.startsWith(selectedDate)
        : true;
      const matchesPrice = maxPrice
        ? (event.price || 0) <= parseFloat(maxPrice)
        : true;

      return matchesSearch && matchesDate && matchesPrice;
    }) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0a0f16]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
            Loading Events
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f16] text-gray-100 font-sans pb-20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-8 overflow-hidden flex flex-col items-center text-center bg-gradient-to-b from-[#111827] to-[#0a0f16]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 z-10"
        >
          Discover{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Extraordinary
          </span>{" "}
          Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl z-10"
        >
          Browse, filter, and secure your spot at the most exclusive tech,
          design, and business summits globally.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 -mt-10">
        <div className="bg-[#1a2235]/80 backdrop-blur-xl p-3 rounded-2xl border border-gray-800 shadow-2xl mb-16 flex flex-col md:flex-row gap-3">
          <div className="relative flex-[2]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search by event title..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f1523] border border-gray-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all text-white placeholder-gray-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CalendarIcon />
            </div>
            <input
              type="date"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f1523] border border-gray-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all text-gray-300 [&::-webkit-calendar-picker-indicator]:invert"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PriceIcon />
            </div>
            <input
              type="number"
              placeholder="Max Price ($)"
              min="0"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f1523] border border-gray-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all text-white placeholder-gray-500"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[#111827] rounded-3xl shadow-xl border border-gray-800 overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-colors"
            >
              {event.img && (
                <div className="h-48 w-full relative">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow relative">
                <h2 className="text-2xl font-bold mb-2 text-white leading-tight group-hover:text-indigo-400 transition-colors">
                  {event.title}
                </h2>

                {event.price != null && (
                  <div className="inline-flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg w-fit mb-5">
                    <p className="text-indigo-400 font-bold text-lg">
                      ${parseFloat(event.price).toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-3">
                    <LocationIcon />
                    <span className="text-gray-400 text-sm leading-relaxed">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon />
                    <span className="text-gray-400 text-sm">
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-800 mb-6"></div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                      Availability
                    </span>
                    <span
                      className={`font-semibold text-sm flex items-center gap-2 ${
                        event.availableSeats === 0
                          ? "text-red-400"
                          : event.availableSeats < 20
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${event.availableSeats === 0 ? "bg-red-400" : event.availableSeats < 20 ? "bg-amber-400" : "bg-emerald-400"}`}
                      ></span>
                      {event.availableSeats === 0
                        ? "Sold Out"
                        : `${event.availableSeats} Seats Remaining`}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: event.availableSeats === 0 ? 1 : 0.97 }}
                  disabled={event.availableSeats === 0}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide transition-all ${
                    event.availableSeats === 0
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
                  }`}
                >
                  {event.availableSeats === 0
                    ? "Registration Closed"
                    : "Reserve Tickets"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredEvents.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl border border-dashed border-gray-700 bg-[#111827]/50"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <SearchIcon />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              No events match your criteria
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any events matching your selected keywords,
              dates, or price range. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
