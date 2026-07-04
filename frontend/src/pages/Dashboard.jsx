import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { 
  FiCloudRain, 
  FiAlertTriangle, 
  FiTrendingUp, 
  FiCompass, 
  FiDroplet, 
  FiCpu, 
  FiSliders, 
  FiGrid 
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import useAquaStore from "../store/useAquaStore";

// Realistic chart data for water intelligence trends
const TREND_DATA = [
  { month: "Jan", rainfall: 80, demand: 450, capacity: 85 },
  { month: "Feb", rainfall: 65, demand: 520, capacity: 82 },
  { month: "Mar", rainfall: 120, demand: 380, capacity: 89 },
  { month: "Apr", rainfall: 45, demand: 610, capacity: 78 },
  { month: "May", rainfall: 30, demand: 750, capacity: 68 },
  { month: "Jun", rainfall: 95, demand: 490, capacity: 72 },
  { month: "Jul", rainfall: 150, demand: 310, capacity: 88 },
];

function Dashboard() {
  // Read state from global store
  const crop = useAquaStore((state) => state.crop);
  const yieldValue = useAquaStore((state) => state.yieldValue);
  const irrigation = useAquaStore((state) => state.irrigation);
  const reservoir = useAquaStore((state) => state.reservoir);
  const advisory = useAquaStore((state) => state.advisory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit pb-12 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      {/* Floating Glass Navigation */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        
        {/* Welcome Telemetry Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              Operations Terminal Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sora tracking-tight text-white">
              Hydrological Intelligence System
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time monitoring of crop growth patterns, reservoir volumes, and automated climate decision paths.
            </p>
          </div>
          
          {/* Quick telemetry widgets */}
          <div className="flex gap-4">
            <div className="px-4 py-3 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">AI Core Health</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <FiCpu /> 99.8% OK
              </span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Global Coverage</span>
              <span className="text-sm font-bold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                <FiCompass /> 12 Reservoirs
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid of Operations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8"
        >
          
          {/* 1. Crop Recommendation Card */}
          <Link to="/crop" className="block group">
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }} 
              className="h-full p-5 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/35 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mb-4">
                  <FiCompass className="text-xl" />
                </div>
                <h3 className="font-sora font-bold text-sm text-slate-300">Crop Advisor</h3>
                <p className="text-[11px] text-slate-500 mt-1">Recommended soil-optimal cultivation</p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Output</div>
                <div className="text-xl font-extrabold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                  {crop || "Pending telemetry"}
                </div>
              </div>
            </motion.div>
          </Link>

          {/* 2. Yield Prediction Card */}
          <Link to="/yield" className="block group">
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }} 
              className="h-full p-5 rounded-2xl glass-card border border-white/5 hover:border-emerald-500/35 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit mb-4">
                  <FiTrendingUp className="text-xl" />
                </div>
                <h3 className="font-sora font-bold text-sm text-slate-300">Yield Forecaster</h3>
                <p className="text-[11px] text-slate-500 mt-1">Projected crop volume output</p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Output</div>
                <div className="text-xl font-extrabold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  {yieldValue ? (
                    <span>
                      <CountUp end={parseFloat(yieldValue)} duration={1.5} separator="," /> kg/ha
                    </span>
                  ) : "Pending query"}
                </div>
              </div>
            </motion.div>
          </Link>

          {/* 3. Water Demand Card */}
          <Link to="/water" className="block group">
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }} 
              className="h-full p-5 rounded-2xl glass-card border border-white/5 hover:border-sky-500/35 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 w-fit mb-4">
                  <FiDroplet className="text-xl" />
                </div>
                <h3 className="font-sora font-bold text-sm text-slate-300">Water Planner</h3>
                <p className="text-[11px] text-slate-500 mt-1">Projected irrigation requirement</p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Output</div>
                <div className="text-xl font-extrabold text-white mt-1 group-hover:text-sky-300 transition-colors">
                  {irrigation || "Pending analysis"}
                </div>
              </div>
            </motion.div>
          </Link>

          {/* 4. Reservoir Risk Card */}
          <Link to="/reservoir" className="block group">
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }} 
              className="h-full p-5 rounded-2xl glass-card border border-white/5 hover:border-yellow-500/35 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 w-fit mb-4">
                  <FiAlertTriangle className="text-xl" />
                </div>
                <h3 className="font-sora font-bold text-sm text-slate-300">Dam Sentinel</h3>
                <p className="text-[11px] text-slate-500 mt-1">Reservoir volume risk monitoring</p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Output</div>
                <div className="text-xl font-extrabold text-white mt-1 group-hover:text-yellow-300 transition-colors">
                  {reservoir || "Pending telemetry"}
                </div>
              </div>
            </motion.div>
          </Link>

          {/* 5. AI Advisory Card */}
          <Link to="/advisory" className="block group">
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }} 
              className="h-full p-5 rounded-2xl glass-card border border-white/5 hover:border-purple-500/35 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit mb-4">
                  <FiCpu className="text-xl" />
                </div>
                <h3 className="font-sora font-bold text-sm text-slate-300">Advisory Engine</h3>
                <p className="text-[11px] text-slate-500 mt-1">ChatGPT interactive advisories</p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Output</div>
                <div className="text-xl font-extrabold text-white mt-1 group-hover:text-purple-300 transition-colors">
                  {advisory ? "Advisory Generated" : "Ready for advisory"}
                </div>
              </div>
            </motion.div>
          </Link>

        </motion.div>

        {/* Charts & Interactive Advisory Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recharts Analytics chart */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 p-6 rounded-3xl glass-card border border-white/5 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-sora font-bold text-lg text-white">Hydrology Trends</h3>
                <p className="text-slate-500 text-xs mt-0.5">Simulated satellite readings of rainfall and water capacities</p>
              </div>
              
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span> Water Demand
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Reservoir Capacity
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }} />
                  <Area type="monotone" dataKey="demand" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} />
                  <Area type="monotone" dataKey="capacity" stroke="#10b981" fillOpacity={1} fill="url(#colorCapacity)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Advisory Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 p-6 rounded-3xl glass-card border border-white/5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-400">
                <FiCpu className="text-xl animate-pulse" />
                <h3 className="font-sora font-bold text-base text-white">Console Advisory</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-900 min-h-48 font-mono">
                {advisory || "No advisory currently stored in active session. Complete forms in Crops or Water channels, then request an AI advisory override."}
              </p>
            </div>

            <Link
              to="/advisory"
              className="mt-6 text-center py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/20 transition-all text-xs font-bold font-sora text-slate-300 hover:text-cyan-400 flex items-center justify-center gap-1.5 group cursor-pointer"
            >
              <span>Initialize Advisory Chat</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;
