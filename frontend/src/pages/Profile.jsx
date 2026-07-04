import { motion } from "framer-motion";
import { FiUser, FiActivity, FiBookmark, FiDatabase, FiCloudDrizzle } from "react-icons/fi";
import { RiWaterFlashLine } from "react-icons/ri";

import Navbar from "../components/Navbar";

// Mock saved predictions
const SAVED_PREDICTIONS = [
  { id: 1, type: "Crop", input: "N:85 P:45 K:40 pH:6.5", output: "Rice, paddy", date: "2026-06-28" },
  { id: 2, type: "Water", input: "Temp:28C Moisture:45%", output: "420 mm (Medium)", date: "2026-06-26" },
  { id: 3, type: "Reservoir", input: "Water Level: 84%", output: "Critical Alert", date: "2026-06-25" },
];

// Mock activity history
const ACTIVITY_LOG = [
  { id: 1, action: "Modified nitrogen telemetry parameters in Crop channel", time: "2 hours ago" },
  { id: 2, action: "Triggered reservoir flood simulation model override", time: "1 day ago" },
  { id: 3, action: "Established operational profile login session", time: "3 days ago" },
];

function Profile() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit pb-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        
        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: User Profile Details */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl flex flex-col items-center text-center">
            
            {/* Avatar Glowing Ring */}
            <div className="relative mb-6">
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500 via-teal-400 to-purple-500 p-1 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                  <FiUser className="text-4xl text-cyan-400" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 h-4.5 w-4.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
            </div>

            <h2 className="text-xl font-extrabold font-sora text-white">Director Hydro-Ops</h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-wider mt-1">Operator Profile #0811</p>
            
            <div className="h-px bg-slate-800 w-full my-6"></div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                <div className="text-xl font-extrabold text-cyan-400 font-mono">148</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">Audit Queries</div>
              </div>
              <div className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                <div className="text-xl font-extrabold text-emerald-400 font-mono">99.8%</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">Model Uptime</div>
              </div>
            </div>

            <div className="mt-8 text-left w-full">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Platform Clearances</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ Smart Farm Diagnostics</li>
                <li className="flex items-center gap-2">✓ Reservoir Release Controls</li>
                <li className="flex items-center gap-2">✓ AI Advisory Synthesis</li>
              </ul>
            </div>

          </div>

          {/* RIGHT: Saved Predictions & History */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Saved Queries section */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl">
              <h3 className="text-lg font-bold font-sora text-white mb-6 flex items-center gap-2">
                <FiBookmark className="text-cyan-400" /> Saved Projections
              </h3>
              
              <div className="space-y-4">
                {SAVED_PREDICTIONS.map((pred) => (
                  <div 
                    key={pred.id} 
                    className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border font-bold ${
                        pred.type === "Crop" ? "bg-cyan-950/40 border-cyan-500/20 text-cyan-400" :
                        pred.type === "Water" ? "bg-sky-950/40 border-sky-500/20 text-sky-400" :
                        "bg-yellow-950/40 border-yellow-500/20 text-yellow-400"
                      }`}>
                        {pred.type}
                      </span>
                      <p className="text-xs text-slate-400 font-mono mt-2">Inputs: {pred.input}</p>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <div className="text-sm font-bold text-white font-sora capitalize">{pred.output}</div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">{pred.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Logs section */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl">
              <h3 className="text-lg font-bold font-sora text-white mb-6 flex items-center gap-2">
                <FiActivity className="text-cyan-400" /> Platform Audit Trail
              </h3>
              
              <div className="space-y-4 relative pl-4 border-l border-slate-800">
                {ACTIVITY_LOG.map((log) => (
                  <div key={log.id} className="relative">
                    <span className="absolute -left-6.5 top-1.5 h-4.5 w-4.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                    </span>
                    <div className="text-xs font-semibold text-slate-300">{log.action}</div>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Profile;
