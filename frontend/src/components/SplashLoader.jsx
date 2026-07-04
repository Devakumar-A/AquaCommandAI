import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiWaterFlashLine } from "react-icons/ri";

const STEPS = [
  "Initializing AI Water Intelligence Engine...",
  "Loading Reservoir Analytics...",
  "Connecting Climate Systems...",
  "Loading Agricultural Intelligence...",
  "System Ready"
];

function SplashLoader({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Process steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          setHistory((h) => [...h, STEPS[prev]]);
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          // Let it sit on "System Ready" for a brief moment
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 450); // Switches steps every 450ms (approx 2.25s total)

    // Progress bar speed
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.15;
        return next > 99.5 ? 100 : next;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] select-none overflow-hidden"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-30 animate-pulse-slow"></div>
      
      {/* Cyber Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        {/* Glowing Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="relative p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <RiWaterFlashLine className="text-4xl text-cyan-400 animate-pulse" />
            <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/20 blur-sm opacity-50"></div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-wider font-sora bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              AQUACOMMAND<span className="text-white">AI</span>
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-cyan-400/80 font-bold uppercase">
              Global Hydrological Core
            </p>
          </div>
        </motion.div>

        {/* Loading Terminal readout */}
        <div className="w-full h-36 bg-slate-950/80 border border-slate-800 rounded-xl p-5 font-mono text-xs text-slate-400 mb-8 flex flex-col justify-end gap-1.5 shadow-inner">
          {history.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2 text-emerald-400/80">
              <span>✓</span>
              <span>{log}</span>
            </div>
          ))}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-2 ${
              currentStep === STEPS.length - 1 ? "text-cyan-400 font-bold" : "text-cyan-300"
            }`}
          >
            <span className="animate-pulse">❯</span>
            <span>{STEPS[currentStep]}</span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-ping inline-block"></span>
          </motion.div>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-full h-2.5 p-0.5 overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          ></motion.div>
        </div>

        <div className="flex justify-between w-full text-[10px] tracking-wider font-mono text-slate-500 uppercase">
          <span>Boot Sequence</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default SplashLoader;
