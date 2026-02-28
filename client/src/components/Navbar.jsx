import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserProfile } from "../State/Auth/Action";
import AuthModal from "./AuthModal";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRightIcon, 
  UserCircleIcon, 
  ArrowLeftEndOnRectangleIcon 
} from "@heroicons/react/24/outline";

export const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const isActive = (path) => location.pathname === path;
  const navLinkClass = (path) => `
    text-sm font-bold tracking-wide transition-colors duration-300 
    ${isActive(path) ? "text-[#FDE067]" : "text-gray-400 hover:text-white"}
  `;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 bg-[#07050f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
        
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter flex items-center group">
            Summitra
            <span className="text-[#8938F2] group-hover:text-[#FDE067] transition-colors duration-500">.</span>
          </Link>

        
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/events" className={navLinkClass("/events")}>Events</Link>
            
            {user && (
              <Link to="/profile" className={navLinkClass("/profile")}>My Wallet</Link>
            )}
            
            {user?.role === "ADMIN" && (
              <Link to="/admin" className={navLinkClass("/admin")}>Dashboard</Link>
            )}

            <a href="/about" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors duration-300">About</a>
            <a href="/speaker" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors duration-300">Speakers</a>
          </div>

       
          <div className="flex items-center space-x-4 md:space-x-6">
            {user ? (
              <div className="flex items-center gap-4">
             
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-full transition-colors"
                >
                  <UserCircleIcon className="w-5 h-5 text-[#8938F2]" />
                  <span className="text-white font-bold text-sm hidden md:block tracking-wide">
                    {user.name?.split(' ')[0]}
                  </span>
                </Link>

                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-4 py-2 rounded-full text-sm font-bold transition-all group"
                >
                  <ArrowLeftEndOnRectangleIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setAuthOpen(true)}
                  className="text-gray-300 hover:text-white font-bold text-sm px-4 py-2 transition-colors"
                >
                  Log In
                </button>

                <button
                  onClick={() => setAuthOpen(true)}
                  className="group bg-[#FDE067] text-black px-6 py-2.5 rounded-full font-extrabold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(253,224,103,0.2)] hover:shadow-[0_0_30px_rgba(253,224,103,0.4)] hover:bg-white transition-all"
                >
                  Buy Tickets 
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};