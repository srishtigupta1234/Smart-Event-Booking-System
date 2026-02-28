import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings, cancelBooking } from "../State/Booking/Action";
import { getAllEvents } from "../State/Event/Action";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  TicketIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  IdentificationIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const {
    bookings,
    latestBooking,
    loading: bookingLoading,
  } = useSelector((state) => state.booking);
  const { events, loading: eventsLoading } = useSelector(
    (state) => state.event,
  );

  const [highlightedId, setHighlightedId] = useState(null);
  const latestBookingRef = useRef(null);

  useEffect(() => {
    dispatch(getUserBookings());
    dispatch(getAllEvents()); 
  }, [dispatch]);

  useEffect(() => {
    if (latestBooking?.id) {
      setHighlightedId(latestBooking.id);

      if (latestBookingRef.current) {
        latestBookingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      const timer = setTimeout(() => setHighlightedId(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [latestBooking]);

  const mappedBookings = bookings?.map((b) => ({
    id: b.bookingId,
    eventTitle: b.eventTitle || "Unknown Event",
    seats: b.seatsBooked || 0,
    status: b.status
      ? b.status.charAt(0).toUpperCase() + b.status.slice(1)
      : "Pending",
    eventDate: b.eventDate
      ? new Date(b.eventDate)
      : new Date(Date.now() + 86400000),
    eventLocation: b.eventLocation || "TBD Location",
    totalAmount: b.totalAmount || 0,
    bookingTime: b.bookingTime ? new Date(b.bookingTime) : new Date(),
  }));

 
  const now = new Date();
  const upcomingBookings = mappedBookings
    .filter((b) => b.eventDate >= now)
    .sort((a, b) => a.eventDate - b.eventDate);

  const previousBookings = mappedBookings
    .filter((b) => b.eventDate < now)
    .sort((a, b) => b.eventDate - a.eventDate);

  const handleCancel = async (id, eventDate) => {
    if (eventDate < now) {
      toast.error("Cannot cancel past events");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to cancel your ticket? This action cannot be reversed.",
      )
    )
      return;

    try {
      await dispatch(cancelBooking(id));
      toast.success("Ticket cancelled successfully.");
      dispatch(getUserBookings());
    } catch (err) {
      toast.error("Failed to cancel booking.");
    }
  };

  if (bookingLoading || eventsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#07050f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8938F2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold tracking-widest text-[#8938F2] uppercase">
            Loading Your Wallet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07050f] text-gray-100 font-sans pb-24 pt-28 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-10">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
              My Wallet
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your upcoming event tickets and view your history.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/events")}
            className="bg-[#FDE067] text-black px-8 py-3.5 rounded-full font-bold shadow-[0_0_30px_rgba(253,224,103,0.2)] hover:shadow-[0_0_40px_rgba(253,224,103,0.4)] transition-all flex items-center gap-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5 stroke-[2.5]" />
            Discover Events
          </motion.button>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <TicketIcon className="w-6 h-6 text-[#8938F2]" />
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Upcoming Tickets
          </h2>
        </div>

        {upcomingBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] p-16 text-center flex flex-col items-center shadow-xl"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <TicketIcon className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Your wallet is empty
            </h3>
            <p className="text-gray-400 mb-8 max-w-md text-lg">
              You haven't booked any upcoming events yet. Secure your spot at
              the next big summit.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold transition-colors border border-white/5"
            >
              Browse Events
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {upcomingBookings.map((b, index) => {
                const isHighlighted = highlightedId === b.id;
                return (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    ref={b.id === latestBooking?.id ? latestBookingRef : null}
                    className={`relative overflow-hidden bg-[#111111] rounded-[2rem] shadow-2xl transition-all duration-700 border ${
                      isHighlighted
                        ? "border-[#FDE067] shadow-[0_0_50px_rgba(253,224,103,0.2)]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {isHighlighted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FDE067]/20 to-[#8938F2]/20 opacity-50 blur-[10px]"></div>
                    )}

                    <div className="relative flex flex-col md:flex-row h-full z-10">
                      <div className="flex-1 p-8 md:p-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${
                                b.status === "Confirmed"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                          <span className="text-xl font-extrabold text-[#FDE067]">
                            ${b.totalAmount.toFixed(2)}
                          </span>
                        </div>

                        <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">
                          {b.eventTitle}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                          <div className="flex items-start gap-3 text-gray-400">
                            <CalendarDaysIcon className="w-5 h-5 text-[#8938F2] shrink-0" />
                            <span className="text-sm font-medium">
                              {b.eventDate.toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-gray-400">
                            <MapPinIcon className="w-5 h-5 text-[#8938F2] shrink-0" />
                            <span className="text-sm font-medium">
                              {b.eventLocation}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-gray-400">
                            <IdentificationIcon className="w-5 h-5 text-[#8938F2] shrink-0" />
                            <span className="text-sm font-medium">
                              Booking ID:{" "}
                              <span className="text-white font-mono ml-1">
                                {b.id}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-gray-400">
                            <TicketIcon className="w-5 h-5 text-[#8938F2] shrink-0" />
                            <span className="text-sm font-bold text-white">
                              {b.seats} Ticket(s)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-64 relative flex flex-col items-center justify-center p-8 bg-white/[0.03] border-t md:border-t-0 md:border-l border-dashed border-white/20">
                        <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#07050f] rounded-full border-r border-white/20"></div>

                        <div className="w-24 h-24 bg-white/10 rounded-xl mb-6 flex items-center justify-center border border-white/10 p-2">
                          <div className="w-full h-full border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center leading-tight">
                              Admit
                              <br />
                              {b.seats}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCancel(b.id, b.eventDate)}
                          className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 py-3 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                          <XMarkIcon
                            className="w-4 h-4 group-hover:rotate-90 transition-transform"
                            strokeWidth={2.5}
                          />
                          Cancel Ticket
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}


        {previousBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <ArchiveBoxIcon className="w-6 h-6 text-gray-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Past Events History
              </h2>
            </div>

            <div className="bg-[#111111] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/10">
                      <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Event
                      </th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Date & Time
                      </th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Tickets
                      </th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Amount
                      </th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {previousBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className="text-base font-bold text-white">
                            {b.eventTitle}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-400">
                          {b.eventDate.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-400">
                          {b.seats}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-300">
                          ${b.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${
                              b.status === "Confirmed"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
