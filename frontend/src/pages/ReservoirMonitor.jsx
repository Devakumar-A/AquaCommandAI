import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSliders, FiActivity, FiCpu, FiAlertTriangle } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Reservoir3D from "../components/Reservoir3D";
import useAquaStore from "../store/useAquaStore";
import API from "../services/api";

function ReservoirMonitor() {
  const [waterLevel, setWaterLevel] = useState(50);
  const [risk, setRisk] = useState("");
  const [healthScore, setHealthScore] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const setReservoir = useAquaStore((state) => state.setReservoir);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRisk("");

    const payload = {
      water_level_percent: parseFloat(waterLevel),
    };

    try {
      const response = await API.post("/reservoir-risk", payload);
      const resRisk = response.risk || response.data?.risk || "Safe";
      
      setRisk(resRisk);
      setReservoir(resRisk);
      
      // Calculate a mockup health score based on risk
      const lvl = parseFloat(waterLevel);
      setHealthScore(Math.round(Math.max(10, 100 - Math.abs(lvl - 50) * 1.5)));
      setIsSuccess(true);
    } catch (error) {
      console.warn("API offline, utilizing local AI model fallback:", error);

      // Local Fallback simulation logic
      setTimeout(() => {
        const lvl = parseFloat(waterLevel);
        let calculatedRisk = "Safe";
        if (lvl > 80) calculatedRisk = "Critical";
        else if (lvl > 60) calculatedRisk = "Warning";

        setRisk(calculatedRisk);
        setReservoir(calculatedRisk);
        
        setHealthScore(Math.round(Math.max(10, 100 - Math.abs(lvl - 50) * 1.5)));
        setIsSuccess(true);
      }, 1000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit pb-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3D Reservoir Scene */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl flex flex-col justify-between min-h-[550px] relative">
            <div>
              <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                <FiActivity className="animate-pulse" />
                Reservoir Structure telemetry
              </div>
              <h2 className="text-xl font-bold font-sora text-white">Volumetric Reservoir levels</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Adjust the water slider on the right to dynamically raise and lower the reservoir plane.
              </p>
            </div>

            {/* 3D Reservoir Canvas */}
            <div className="flex-1 w-full my-4 rounded-2xl bg-slate-950/40 border border-slate-900 overflow-hidden relative shadow-inner">
              <Reservoir3D waterLevel={waterLevel} />
              
              {/* Color status alert on bottom left */}
              {risk && (
                <div className="absolute bottom-4 left-4 p-3 rounded-xl glass-card border border-white/5 animate-float-slow text-left flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    risk === "Critical" ? "bg-red-500 animate-ping" :
                    risk === "Warning" ? "bg-yellow-500" :
                    "bg-cyan-500"
                  }`}></span>
                  <span className="text-xs font-mono font-bold text-white uppercase">{risk} STATUS</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Hydrological Feed</h4>
              <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                R3F rendering connects soil nitrogen density mappings to seed maturity growth metrics.
              </p>
            </div>
          </div>

          {/* RIGHT: Slider Control Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold font-sora text-white flex items-center gap-2">
                <FiSliders className="text-cyan-400 text-xl" />
                Dam Sentinel Controls
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Override active sensor readings to project flood risks or drought depletion safety margins.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Level Control Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Water Level Percent</span>
                  <span className="text-cyan-400 font-mono font-bold text-base">{waterLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(e.target.value)}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (Empty)</span>
                  <span>50% (Normal)</span>
                  <span>100% (Overflow)</span>
                </div>
              </div>

              {/* Submit check button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 font-bold font-sora text-sm text-slate-950 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Dam Integrity...</span>
                  </>
                ) : (
                  <>
                    <FiCpu className="text-lg" />
                    <span>Run Sentinel Integrity Audit</span>
                  </>
                )}
              </button>

            </form>

            {/* Results Alert Screen */}
            <AnimatePresence>
              {risk && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-8 p-5 rounded-2xl bg-slate-950/40 border border-slate-900 shadow-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                        Reservoir Health
                      </span>
                      <h3 className="text-2xl font-extrabold font-sora text-white tracking-tight">
                        {healthScore}% <span className="text-slate-400 text-xs font-normal">Integrity Index</span>
                      </h3>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border ${
                      risk === "Critical" ? "bg-red-950/40 border-red-500/25 text-red-400" :
                      risk === "Warning" ? "bg-yellow-950/40 border-yellow-500/25 text-yellow-400" :
                      "bg-cyan-950/40 border-cyan-500/25 text-cyan-400"
                    }`}>
                      {risk} Status
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                    <FiAlertTriangle className={`text-lg mt-0.5 flex-shrink-0 ${
                      risk === "Critical" ? "text-red-400" :
                      risk === "Warning" ? "text-yellow-400" :
                      "text-cyan-400"
                    }`} />
                    <p className="text-xs text-slate-400 leading-relaxed font-outfit">
                      {risk === "Critical" && "CRITICAL WARNING: Water capacity exceeds safety thresholds. Initiate flood bypass sluice gates immediately."}
                      {risk === "Warning" && "SYSTEM ALERT: Elevating capacities detected. Monitor dam structural stress nodes closely and suspend water inbound channels."}
                      {risk === "Safe" && "SAFE LEVEL: Reservoir volumetric status resides within nominal boundaries. No action required."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </main>
    </div>
  );
}

export default ReservoirMonitor;
