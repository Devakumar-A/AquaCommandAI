import { useState } from "react";
import { FiSettings, FiSliders, FiBell, FiShield, FiGlobe, FiSun, FiMoon, FiCpu } from "react-icons/fi";

import Navbar from "../components/Navbar";

function Settings() {
  const [theme, setTheme] = useState("dark");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [telemetrySync, setTelemetrySync] = useState(true);
  const [language, setLanguage] = useState("English");
  const [securityLevel, setSecurityLevel] = useState("Enterprise");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit pb-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        
        {/* Settings Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-sora tracking-tight text-white flex items-center gap-2">
            <FiSettings className="text-cyan-400" /> System Preferences
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Configure telemetry polling rates, UI themes, and model alert triggers.
          </p>
        </div>

        {/* Settings grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: UI & Theme Settings */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* UI Theme Selection */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl">
              <h3 className="text-base font-bold font-sora text-white mb-6 flex items-center gap-2">
                <FiSun className="text-cyan-400" /> Interface Theme
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`py-3.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    theme === "light"
                      ? "bg-slate-900 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                      : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <FiSun className="text-base" />
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`py-3.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-slate-900 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                      : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <FiMoon className="text-base" />
                  <span>Dark Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`py-3.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    theme === "system"
                      ? "bg-slate-900 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                      : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <FiCpu className="text-base" />
                  <span>System Link</span>
                </button>
              </div>
            </div>

            {/* Notification alert configurations */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl">
              <h3 className="text-base font-bold font-sora text-white mb-6 flex items-center gap-2">
                <FiBell className="text-cyan-400" /> Sentinel Notifications
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer py-1.5 select-none">
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Email Telemetry Digest</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Receive daily agricultural predictions summary.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1.5 select-none">
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Critical Reservoir Alarms</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Instant alerts if water capacities exceed 85% safety nodes.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={criticalAlerts}
                    onChange={(e) => setCriticalAlerts(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1.5 select-none">
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Autonomous Satellite Syncs</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Poll NOAA climate models continuously.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={telemetrySync}
                    onChange={(e) => setTelemetrySync(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Security & Operations Settings */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Account Settings */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl space-y-5">
              
              <h3 className="text-base font-bold font-sora text-white mb-2 flex items-center gap-2">
                <FiGlobe className="text-cyan-400" /> Regional & Localization
              </h3>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">Primary Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                  <option>Mandarin</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">API Security Level</label>
                <select
                  value={securityLevel}
                  onChange={(e) => setSecurityLevel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer"
                >
                  <option>Enterprise (SAML/OAuth)</option>
                  <option>Standard (Token API)</option>
                  <option>Sandbox Only</option>
                </select>
              </div>

            </div>

            {/* Platform Information (Telemetry signature) */}
            <div className="p-6 rounded-3xl glass-card border border-white/5 shadow-2xl flex flex-col gap-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <FiShield className="text-emerald-400 animate-pulse" /> Platform Operations Signature
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                System Version: v1.0.0-Stable<br />
                Security Framework: Active (AES-256)<br />
                Model Engine: Gemini-Aqua-Pro v3.5
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Settings;
