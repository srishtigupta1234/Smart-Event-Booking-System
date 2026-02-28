import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { 
  CheckCircleIcon, 
  ArrowDownTrayIcon, 
  WalletIcon 
} from "@heroicons/react/24/outline";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { latestBooking } = useSelector((state) => state.booking);

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  useEffect(() => {
    if (!latestBooking) {
      navigate("/profile");
    }
  }, [latestBooking, navigate]);

  const downloadTicket = () => {
    const canvas = document.getElementById("ticket-qr-code");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `Summitra_Ticket_${latestBooking?.bookingId || 'VIP'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (!latestBooking) return null;

  const qrData = JSON.stringify({
    bookingId: latestBooking.bookingId,
    event: latestBooking.eventTitle,
    seats: latestBooking.seatsBooked,
    status: "Confirmed"
  });

  return (
    <div className="min-h-screen bg-[#07050f] text-gray-100 flex items-center justify-center py-20 px-6 relative overflow-hidden selection:bg-[#8938F2] selection:text-white">
      
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false} 
        numberOfPieces={500}
        gravity={0.15}
        colors={['#8938F2', '#FDE067', '#ffffff', '#4ade80']}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8938F2]/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
      
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
            <CheckCircleIcon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Payment Successful!</h1>
          <p className="text-gray-400">Your spot is secured. Have a great time at the event.</p>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden mb-8"
        >
          <div className="p-8 text-center border-b border-dashed border-white/20 relative bg-gradient-to-b from-white/[0.05] to-transparent">
  
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#07050f] rounded-full border-t border-r border-white/10 rotate-45"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#07050f] rounded-full border-t border-l border-white/10 -rotate-45"></div>
            
            <span className="bg-[#FDE067]/10 text-[#FDE067] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Confirmed
            </span>
            <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{latestBooking.eventTitle}</h2>
            <p className="text-gray-400 text-sm">Admit: <span className="font-bold text-white">{latestBooking.seatsBooked}</span> Ticket(s)</p>
          </div>

    
          <div className="p-8 flex flex-col items-center justify-center bg-white/[0.01]">
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
              <QRCodeCanvas 
                id="ticket-qr-code"
                value={qrData} 
                size={180} 
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"} 
              />
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">ID: {latestBooking.bookingId}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={downloadTicket}
            className="w-full bg-[#FDE067] text-black py-4 rounded-full font-extrabold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(253,224,103,0.2)] hover:shadow-[0_0_40px_rgba(253,224,103,0.4)] hover:bg-white"
          >
            <ArrowDownTrayIcon className="w-5 h-5 stroke-[2.5]" />
            Download QR Ticket
          </button>
          
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <WalletIcon className="w-5 h-5" />
            Go to My Wallet
          </button>
        </motion.div>

      </div>
    </div>
  );
}