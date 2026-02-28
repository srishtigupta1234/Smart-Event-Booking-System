import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../State/Event/Action";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
  MapPinIcon,
  TicketIcon,
  PlusIcon,
  XMarkIcon,
  ShieldCheckIcon,
  GlobeAmericasIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    totalSeats: "",
    price: "",
    img: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { title, description, location, date, totalSeats, price, img } = form;

    if (!title || !description || !location || !date || !totalSeats || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    if (parseInt(totalSeats) <= 0) {
      toast.error("Total seats must be greater than zero");
      return;
    }

    if (parseFloat(price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    const eventDate = new Date(date);
    if (eventDate <= new Date()) {
      toast.error("Event date must be in the future");
      return;
    }

    const payload = {
      title,
      description,
      location,
      totalSeats: parseInt(totalSeats),
      date: eventDate.toISOString().slice(0, 19),
      price: parseFloat(price),
      img: img.trim() || null,
    };

    if (editingId) {
      dispatch(updateEvent(editingId, payload));
      toast.success("Event updated successfully");
      setEditingId(null);
    } else {
      dispatch(createEvent(payload));
      toast.success("Event deployed successfully");
    }

    resetForm();
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    const localDate = new Date(event.date);

    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(localDate - tzOffset)
      .toISOString()
      .slice(0, 16);

    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      date: localISOTime,
      totalSeats: event.totalSeats || 0,
      price: event.price || 0,
      img: event.img || "",
    });

    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      try {
        dispatch(deleteEvent(id));
        toast.success("Event deleted successfully");
      } catch (err) {
        toast.error("Cannot delete: bookings exist for this event");
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      location: "",
      date: "",
      totalSeats: "",
      price: "",
      img: "",
    });
  };

  if (loading && !events?.length) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0a0f16]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
            Loading Workspace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f16] text-gray-100 font-sans pb-20 pt-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-gray-800 pb-8">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <ShieldCheckIcon className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
                Admin Control Panel
              </h1>
              <p className="text-gray-400 mt-1 font-medium">
                Manage events, preview locations, and oversee platform
                availability.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-[#111827]/80 backdrop-blur-xl p-8 rounded-[2rem] mb-16 shadow-2xl transition-all duration-500 border ${
            editingId
              ? "border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
              : "border-gray-800"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              {editingId ? (
                <>
                  <PencilSquareIcon className="w-7 h-7 text-amber-400" />{" "}
                  Editing Event{" "}
                  <span className="text-gray-500 text-lg font-mono ml-1">
                    #{editingId}
                  </span>
                </>
              ) : (
                <>
                  <PlusIcon className="w-7 h-7 text-indigo-400" /> Create New
                  Event
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center gap-2 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            <div className="xl:col-span-3 grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Global Tech Summit 2026"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Location Address
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Moscone Center, San Francisco"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white [color-scheme:dark] shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Total Capacity
                </label>
                <div className="relative">
                  <TicketIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    name="totalSeats"
                    placeholder="e.g. 500"
                    value={form.totalSeats}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Price ($)
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="e.g. 99.00"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Cover Image URL
                </label>
                <div className="relative">
                  <PhotoIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="img"
                    placeholder="https://example.com/event-banner.jpg"
                    value={form.img}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Event Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the event, speakers, agenda, etc..."
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-[#0a0f16] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-600 resize-none shadow-inner"
                />
              </div>
            </div>

            <div className="xl:col-span-2 flex flex-col h-full min-h-[300px]">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1.5">
                Live Location Preview
              </label>
              <div className="flex-1 relative rounded-2xl overflow-hidden border border-gray-700 bg-[#0a0f16] shadow-inner group">
                <div className="absolute top-4 left-4 z-10 bg-[#111827]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-2 shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    {form.location && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${form.location ? "bg-emerald-500" : "bg-gray-500"}`}
                    ></span>
                  </span>
                  <span className="text-xs font-semibold text-gray-300">
                    {form.location ? "GPS Active" : "Awaiting Input"}
                  </span>
                </div>

                {form.location ? (
                  <iframe
                    title="Live Map Preview"
                    className="w-full h-full border-0 filter grayscale-[20%] contrast-125 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(form.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                    <GlobeAmericasIcon className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-sm font-medium text-gray-500">
                      Map Preview Disabled
                    </p>
                    <p className="text-xs mt-1 text-gray-600">
                      Enter a location address to load map.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2 ${
                editingId
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              }`}
            >
              {editingId ? "Save Updates" : "Publish Event to Platform"}
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-2">
          <div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Active Deployments
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Monitor live events, track registrations, and manage
              configurations.
            </p>
          </div>
          <div className="bg-[#111827] text-indigo-400 text-sm font-bold px-5 py-2.5 rounded-xl border border-indigo-500/20 shadow-inner flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            {events?.length || 0} Events Online
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {events?.map((event) => {
              const eventDate = new Date(event.date);
              const month = eventDate
                .toLocaleString("default", { month: "short" })
                .toUpperCase();
              const day = eventDate.getDate();

              const total = event.totalSeats || event.totalSeat || 0;
              const available =
                event.availableSeats ?? event.availableSeat ?? total;
              const bookedSeats = total - available;
              const bookedPercentage =
                total > 0 ? Math.round((bookedSeats / total) * 100) : 0;
              const isSoldOut = available === 0 && total > 0;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  className={`bg-[#111827] border rounded-[1.5rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                    editingId === event.id
                      ? "border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.08)]"
                      : "border-gray-800 hover:border-indigo-500/30"
                  }`}
                >
                  <div className="flex flex-col xl:flex-row gap-8">
                    <div
                      className={`w-full xl:w-56 shrink-0 rounded-2xl border border-gray-700/50 flex flex-col items-center justify-center relative overflow-hidden shadow-inner transition-colors ${!event.img ? "bg-gradient-to-b from-gray-800 to-[#0a0f16] p-6 group-hover:border-indigo-500/30" : "min-h-[160px] group-hover:border-indigo-500/50"}`}
                    >
                      {event.img && (
                        <div className="absolute inset-0">
                          <img
                            src={event.img}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] to-transparent opacity-80"></div>
                        </div>
                      )}

                      <div
                        className={`absolute top-0 w-full h-1.5 ${event.img ? "bg-indigo-500/80 z-10" : "bg-indigo-500"}`}
                      ></div>

                      <div
                        className={
                          event.img
                            ? "absolute top-3 left-3 bg-[#0a0f16]/80 backdrop-blur-md border border-gray-700 rounded-xl px-3 py-2 flex flex-col items-center justify-center min-w-[55px] shadow-lg"
                            : "flex flex-col items-center justify-center"
                        }
                      >
                        <span className="text-indigo-400 font-bold tracking-widest text-[10px] sm:text-xs mb-0.5">
                          {month}
                        </span>
                        <span
                          className={`font-extrabold text-white ${event.img ? "text-xl" : "text-4xl"}`}
                        >
                          {day}
                        </span>
                        {!event.img && (
                          <span className="text-gray-500 text-xs mt-2 font-medium">
                            {eventDate.getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                            {event.title}
                          </h2>
                          <span className="text-gray-500 text-[10px] uppercase tracking-widest font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">
                            ID: {event.id}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mt-auto">
                          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                            <MapPinIcon className="w-4 h-4 text-indigo-400" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                            <CalendarDaysIcon className="w-4 h-4 text-indigo-400" />
                            {eventDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            {parseFloat(event.price || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full xl:w-72 shrink-0 border-t xl:border-t-0 xl:border-l border-gray-800 pt-6 xl:pt-0 xl:pl-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <UsersIcon className="w-4 h-4" /> Capacity
                          </span>
                          <span className="text-sm font-bold text-white">
                            {bookedPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-900 rounded-full h-2 shadow-inner border border-gray-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${isSoldOut ? "bg-red-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`}
                            style={{ width: `${bookedPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-gray-500 font-medium">
                            {bookedSeats} Booked
                          </span>
                          <span
                            className={
                              isSoldOut
                                ? "text-red-400 font-bold"
                                : "text-emerald-400 font-bold"
                            }
                          >
                            {available} Available
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0a0f16] hover:bg-amber-500/10 text-gray-300 hover:text-amber-400 border border-gray-700 hover:border-amber-500/30 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                        >
                          <PencilSquareIcon className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0a0f16] hover:bg-red-500/10 text-gray-300 hover:text-red-400 border border-gray-700 hover:border-red-500/30 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                        >
                          <TrashIcon className="w-4 h-4" /> Drop
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {(!events || events.length === 0) && !loading && (
            <div className="text-center py-24 bg-[#111827] rounded-[2rem] border border-dashed border-gray-700">
              <div className="w-20 h-20 bg-[#0a0f16] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800 shadow-inner">
                <GlobeAmericasIcon className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Deployments Found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Your platform currently has no active events. Use the control
                panel above to deploy your first event.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
