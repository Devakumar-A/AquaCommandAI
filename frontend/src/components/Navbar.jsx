import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiWaterFlashLine } from "react-icons/ri";
import { 
  FiMenu, 
  FiX, 
  FiLayout, 
  FiCompass, 
  FiTrendingUp, 
  FiDroplet, 
  FiLayers, 
  FiMessageSquare, 
  FiUser, 
  FiSettings 
} from "react-icons/fi";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: FiLayout },
  { path: "/crop", label: "Crops", icon: FiCompass },
  { path: "/yield", label: "Yields", icon: FiTrendingUp },
  { path: "/water", label: "Irrigation", icon: FiDroplet },
  { path: "/reservoir", label: "Reservoir", icon: FiLayers },
  { path: "/advisory", label: "AI Advisor", icon: FiMessageSquare },
  { path: "/profile", label: "Profile", icon: FiUser },
  { path: "/settings", label: "Settings", icon: FiSettings },
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8">
      {/* Floating Glass Wrapper */}
      <nav className="mx-auto max-w-7xl rounded-2xl sm:rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 px-4 py-3 sm:py-2.5 my-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex justify-between items-center transition-all duration-300">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30">
            <RiWaterFlashLine className="text-xl text-cyan-400" />
          </div>
          <span className="font-sora font-extrabold text-sm sm:text-base tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            AQUACOMMAND<span className="text-white">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive 
                    ? "text-cyan-300 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)] border border-cyan-500/20" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="text-sm" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -bottom-0.5 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side system telemetry tag / Logout */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
            Core: online
          </span>
          <Link
            to="/auth/login"
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800 hover:border-cyan-500/30 px-3.5 py-1.5 rounded-full"
          >
            Terminal Out
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 mt-2 p-5 rounded-2xl bg-slate-950/90 backdrop-blur-lg border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-40 lg:hidden flex flex-col gap-2.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? "text-cyan-300 bg-cyan-950/20 border border-cyan-500/25" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="h-px bg-slate-800/80 my-2"></div>
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/25 text-xs font-bold transition-all"
            >
              Terminal Out
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;