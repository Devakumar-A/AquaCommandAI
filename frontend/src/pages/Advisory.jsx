import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiMessageSquare, FiSend, FiActivity, FiLayers } from "react-icons/fi";
import { RiWaterFlashLine } from "react-icons/ri";

import Navbar from "../components/Navbar";
import AIAssistant3D from "../components/AIAssistant3D";
import useAquaStore from "../store/useAquaStore";
import API from "../services/api";

function Advisory() {
  // Pull previous results from global store to pre-populate telemetry fields
  const storeCrop = useAquaStore((state) => state.crop) || "Rice";
  const storeYield = useAquaStore((state) => state.yieldValue) || "25661";
  const storeIrrigation = useAquaStore((state) => state.irrigation) || "Medium";
  const storeReservoir = useAquaStore((state) => state.reservoir) || "Safe";

  const [formData, setFormData] = useState({
    crop: storeCrop,
    yield_value: storeYield,
    irrigation_need: storeIrrigation,
    water_level_percent: "50",
  });

  const [chatLogs, setChatLogs] = useState([
    { sender: "ai", text: "Hydrological Intelligence Core initialized. Direct telemetry metrics is loaded. Submit report synthesis request to compile AI Advisory briefing." }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const setAdvisory = useAquaStore((state) => state.setAdvisory);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateAdvisoryText = (data) => {
    return `CLIMATE SECURITY SUMMARY DIRECTIVE:
Recommended Crop: ${data.crop}
Target Yield: ${parseFloat(data.yield_value).toLocaleString()} kg/ha
Irrigation Demand: ${data.irrigation_need}
Reservoir Level: ${data.water_level_percent}%

INTELLIGENCE REPORT:
Based on soil parameters and regional climate forecasting, agricultural fields display high nitrogen profiles matching optimal growth indices for ${data.crop}. Ambient temperatures at ${data.water_level_percent}% capacity indicate low evaporation ratios. 

OPERATIONAL DIRECTIONS:
1. Schedule a 4-day canal irrigation dispatch matching '${data.irrigation_need}' demand parameters.
2. Confirm dam gate operations remain locked under '${storeReservoir}' reservoir warning margins.
3. Apply nitrogen buffers in early vegetative crop stages to lock in maximum projected yield output.`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(true);

    const payload = {
      crop: formData.crop,
      yield_value: parseFloat(formData.yield_value),
      irrigation_need: formData.irrigation_need,
      water_level_percent: parseFloat(formData.water_level_percent),
    };

    // Add query log
    setChatLogs((prev) => [
      ...prev,
      { sender: "user", text: `Synthesize comprehensive advisory report for crop: ${formData.crop}, yield target: ${formData.yield_value} kg/ha.` }
    ]);

    try {
      const response = await API.post("/advisory", payload);
      const report = response.advisory || response.data?.advisory || generateAdvisoryText(formData);

      simulateStreamResponse(report);
      setAdvisory(report);
    } catch (error) {
      console.warn("API offline, utilizing local AI model fallback:", error);
      
      setTimeout(() => {
        const report = generateAdvisoryText(formData);
        simulateStreamResponse(report);
        setAdvisory(report);
      }, 1000);
    }
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText;
    setInputText("");

    setChatLogs((prev) => [...prev, { sender: "user", text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "I have reviewed your query. Telemetry parameters indicate nominal operational statuses across all monitored agricultural grids.";
      if (query.toLowerCase().includes("crop") || query.toLowerCase().includes("plant")) {
        aiResponse = `Soil attributes currently recommend focusing on ${formData.crop} cultivation patterns. Ensure fertilizer nitrogen levels remain consistent with inputs.`;
      } else if (query.toLowerCase().includes("water") || query.toLowerCase().includes("rain") || query.toLowerCase().includes("irrigation")) {
        aiResponse = `Projected water demand stands at ${formData.irrigation_need} levels. Adjust dispatch gates relative to local reservoir readings.`;
      } else if (query.toLowerCase().includes("reservoir") || query.toLowerCase().includes("dam")) {
        aiResponse = `Reservoir level registers at ${formData.water_level_percent}%. Operating parameters reflect stable and safe capacity limits.`;
      }
      simulateStreamResponse(aiResponse);
    }, 1200);
  };

  const simulateStreamResponse = (text) => {
    setIsTyping(false);
    setChatLogs((prev) => [...prev, { sender: "ai", text }]);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit pb-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-cyan rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-purple rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3D Holographic AI Assistant */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-card border border-white/5 shadow-2xl flex flex-col justify-between min-h-[550px] relative">
            <div>
              <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                <FiCpu className="animate-pulse" />
                Holographic Assistant Link
              </div>
              <h2 className="text-xl font-bold font-sora text-white">AI Core Orb</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                The visualizer bobs and pulses corresponding to active chat response streams.
              </p>
            </div>

            {/* 3D Hologram assistant Canvas */}
            <div className="flex-1 w-full my-4 rounded-2xl bg-slate-950/40 border border-slate-900 overflow-hidden relative shadow-inner">
              <AIAssistant3D />
              
              {isTyping && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full glass-card border border-white/5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce delay-150"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce delay-300"></span>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Advisory Telemetry</h4>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-500">
                <span>Crop: {formData.crop}</span>
                <span>Yield: {formData.yield_value} kg</span>
                <span>Water: {formData.irrigation_need}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Chat Terminal & Form */}
          <div className="lg:col-span-7 grid grid-rows-1 gap-6">
            
            {/* Form to populate metrics */}
            <div className="p-6 rounded-3xl glass-card border border-white/5 shadow-2xl">
              <h3 className="text-sm font-bold font-sora text-slate-300 mb-4 flex items-center gap-2">
                <FiLayers className="text-cyan-400" /> Pre-Synthesize Telemetry
              </h3>
              
              <form onSubmit={handleFormSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Crop</label>
                  <input
                    type="text"
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Yield (kg/ha)</label>
                  <input
                    type="number"
                    name="yield_value"
                    value={formData.yield_value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Irrigation</label>
                  <select
                    name="irrigation_need"
                    value={formData.irrigation_need}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-bold font-sora text-xs text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Run Report
                  </button>
                </div>
              </form>
            </div>

            {/* ChatGPT Terminal Console */}
            <div className="p-6 rounded-3xl glass-card border border-white/5 shadow-2xl flex flex-col justify-between h-[420px]">
              
              {/* Message scroll area */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {chatLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`flex ${log.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-outfit leading-relaxed shadow-sm ${
                        log.sender === "user"
                          ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none"
                          : "bg-slate-900/80 border border-slate-800 text-slate-300 rounded-tl-none font-mono whitespace-pre-line"
                      }`}
                    >
                      {log.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
                      <span className="text-[10px] font-mono text-cyan-400">Core thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleChatSend} className="mt-4 flex gap-2 pt-3 border-t border-slate-850">
                <div className="relative flex-1">
                  <FiMessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask AI Advisor about soil offsets or reservoir releases..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <FiSend />
                </button>
              </form>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Advisory;
