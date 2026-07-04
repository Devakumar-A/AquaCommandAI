import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiEye, 
  FiEyeOff, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiShield, 
  FiActivity 
} from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { RiWaterFlashLine } from "react-icons/ri";

import SplashLoader from "../components/SplashLoader";
import WaterParticles from "../components/WaterParticles";
import Earth3D from "../components/Earth3D";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine starting auth mode based on active route path
  const getModeFromPath = (path) => {
    if (path.includes("register")) return "register";
    if (path.includes("forgot-password")) return "forgot";
    if (path.includes("reset-password")) return "reset";
    return "login";
  };

  const [authMode, setAuthMode] = useState(getModeFromPath(location.pathname));
  const [showSplash, setShowSplash] = useState(true);

  // Sync mode state with route changes (e.g. if back/forward button is clicked)
  useEffect(() => {
    setAuthMode(getModeFromPath(location.pathname));
  }, [location.pathname]);

  // Transition modes and update URL route
  const transitionTo = (mode) => {
    setAuthMode(mode);
    if (mode === "login") navigate("/auth/login");
    else if (mode === "register") navigate("/auth/register");
    else if (mode === "forgot") navigate("/auth/forgot-password");
    else if (mode === "reset") navigate("/auth/reset-password");
  };

  // Form Field States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Strength Meter State
  const [passStrength, setPassStrength] = useState({ score: 0, text: "Weak", color: "bg-red-500" });

  // Status/Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate Password Strength in Real-Time
  useEffect(() => {
    if (!password) {
      setPassStrength({ score: 0, text: "None", color: "bg-slate-700" });
      return;
    }
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let text = "Weak";
    let color = "bg-red-500";

    if (score >= 4) {
      text = "Strong";
      color = "bg-emerald-400";
    } else if (score >= 2) {
      text = "Medium";
      color = "bg-yellow-400";
    }

    setPassStrength({ score, text, color });
  }, [password]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Simple frontend validations
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (authMode === "register" && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (authMode === "register" && !termsAgreed) {
      setErrorMessage("You must agree to the Terms of Service.");
      return;
    }

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Post-success handling
      setTimeout(() => {
        setIsSuccess(false);
        if (authMode === "login" || authMode === "register") {
          // Navigate to main platform Dashboard
          navigate("/");
        } else if (authMode === "forgot") {
          // Back to Login
          transitionTo("login");
          setEmail("");
        } else if (authMode === "reset") {
          transitionTo("login");
          setPassword("");
          setConfirmPassword("");
        }
      }, 2000);
    }, 1800);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashLoader onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="relative min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#020617] font-outfit text-slate-100">
          
          {/* 1. Global Ambient Glows */}
          <div className="absolute top-10 left-[10%] w-[40vw] h-[40vw] max-w-[500px] glow-cyan rounded-full filter blur-[120px] opacity-25 animate-pulse-slow pointer-events-none"></div>
          <div className="absolute bottom-10 right-[15%] w-[40vw] h-[40vw] max-w-[500px] glow-purple rounded-full filter blur-[120px] opacity-20 animate-pulse-slow pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[450px] glow-emerald rounded-full filter blur-[110px] opacity-15 animate-pulse-slow pointer-events-none"></div>

          {/* 2. Background Elements (Cyber grid & Particle droplets) */}
          <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>
          <WaterParticles />

          {/* 3. LEFT COLUMN: 3D Scene (Globe, satellites, telemetry) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-12 relative z-10 select-none">
            {/* Header branding */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <RiWaterFlashLine className="text-2xl text-cyan-400" />
              </div>
              <span className="font-sora text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
                AquaCommandAI
              </span>
            </div>

            {/* Main 3D Canvas */}
            <div className="flex-1 w-full max-h-[650px] flex items-center justify-center relative">
              <Earth3D />
              
              {/* Telemetry/Data Widgets layered over Canvas */}
              <div className="absolute bottom-4 left-4 p-4 rounded-xl glass-card text-left max-w-xs border border-white/5 animate-float-slow">
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <FiActivity className="animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold">Climate Sat Telemetry</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Orbit: NOAA-21 / Sat-9<br />
                  Data Link: Active (98.4 Gbps)<br />
                  Coverage: Global Hydrological Mesh
                </p>
              </div>

              <div className="absolute top-4 right-4 p-4 rounded-xl glass-card text-left max-w-xs border border-white/5 animate-float-medium">
                <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold mb-1">
                  AI Model Status
                </div>
                <div className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  99.8% Accuracy
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Reservoir forecasting models operating within target parameters.
                </p>
              </div>
            </div>

            {/* Bottom Slogan / Mission */}
            <div className="text-left max-w-md">
              <h2 className="text-2xl font-bold font-sora text-white leading-snug">
                Futuristic Climate & Water Intelligence
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Deploying deep learning networks to analyze water security, reservoir risks, and intelligent crop forecasting globally.
              </p>
            </div>
          </div>

          {/* 4. RIGHT COLUMN: Immersive Form Center */}
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center p-4 sm:p-8 md:p-12 relative z-10 min-h-screen">
            
            {/* Glassmorphism Auth Card */}
            <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden flex flex-col justify-between">
              
              {/* Top ambient color bar indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500"></div>

              <div>
                {/* Header Logo for Mobile */}
                <div className="flex items-center justify-between mb-8 lg:hidden">
                  <div className="flex items-center gap-2">
                    <RiWaterFlashLine className="text-2xl text-cyan-400" />
                    <span className="font-sora text-lg font-bold tracking-wider">
                      AquaCommandAI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                    v1.0.0
                  </span>
                </div>

                {/* Animated Form container */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={authMode}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {/* Switch Auth mode titles */}
                    {authMode === "login" && (
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white tracking-tight">
                          Welcome Back
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">
                          Authenticate to access the water command console
                        </p>
                      </div>
                    )}

                    {authMode === "register" && (
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white tracking-tight">
                          Join Platform
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">
                          Create an account to begin monitoring resources
                        </p>
                      </div>
                    )}

                    {authMode === "forgot" && (
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white tracking-tight">
                          Reset Access
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">
                          Recover credentials for your command console
                        </p>
                      </div>
                    )}

                    {authMode === "reset" && (
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white tracking-tight">
                          New Credentials
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">
                          Define secure password keys for your profile
                        </p>
                      </div>
                    )}

                    {/* Error Alerts */}
                    {errorMessage && (
                      <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Submit handler */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Name input (Register Only) */}
                      {authMode === "register" && (
                        <div className="relative">
                          <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Director Hydro-Ops"
                              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Email input (Login, Register, Forgot) */}
                      {authMode !== "reset" && (
                        <div className="relative">
                          <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="operator@aquacommand.ai"
                              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Password input (Login, Register, Reset) */}
                      {authMode !== "forgot" && (
                        <div className="relative">
                          <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">
                            {authMode === "reset" ? "New Password" : "Password"}
                          </label>
                          <div className="relative">
                            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                            <input
                              type={showPass ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••••••"
                              className="w-full pl-10 pr-12 py-3 rounded-xl glass-input text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                              {showPass ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                          </div>

                          {/* Live strength meter (Register Only) */}
                          {authMode === "register" && password && (
                            <div className="mt-2.5 space-y-1.5">
                              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                                <span>Security Level:</span>
                                <span className={passStrength.score >= 4 ? "text-emerald-400" : passStrength.score >= 2 ? "text-yellow-400" : "text-red-400"}>
                                  {passStrength.text}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3].map((step) => (
                                  <div
                                    key={step}
                                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                      password.length > 0 &&
                                      (step === 1 || 
                                       (step === 2 && passStrength.score >= 2) || 
                                       (step === 3 && passStrength.score >= 4))
                                        ? passStrength.color
                                        : "bg-slate-800"
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Confirm Password input (Register, Reset Only) */}
                      {(authMode === "register" || authMode === "reset") && (
                        <div className="relative">
                          <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 pl-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                            <input
                              type={showPass ? "text" : "password"}
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••••••"
                              className="w-full pl-10 pr-12 py-3 rounded-xl glass-input text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Extra actions: Remember Me / Forgot Password (Login Only) */}
                      {authMode === "login" && (
                        <div className="flex items-center justify-between text-xs py-1 select-none">
                          <label className="flex items-center gap-2 cursor-pointer group text-slate-300 hover:text-slate-200">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="rounded border-slate-700 bg-slate-800/80 text-cyan-500 focus:ring-cyan-500/30 focus:ring-2 w-4 h-4 cursor-pointer"
                            />
                            <span>Keep Session Active</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => transitionTo("forgot")}
                            className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}

                      {/* Extra actions: Terms & Conditions (Register Only) */}
                      {authMode === "register" && (
                        <div className="flex items-start text-xs py-1 select-none">
                          <label className="flex gap-2.5 cursor-pointer group text-slate-400 leading-normal">
                            <input
                              type="checkbox"
                              required
                              checked={termsAgreed}
                              onChange={(e) => setTermsAgreed(e.target.checked)}
                              className="rounded border-slate-700 bg-slate-800/80 text-cyan-500 focus:ring-cyan-500/30 focus:ring-2 w-4 h-4 mt-0.5 cursor-pointer"
                            />
                            <span>
                              I authorize the system to bind my telemetry credentials under the{" "}
                              <a href="#terms" className="text-cyan-400 hover:underline">Terms of Service</a> &{" "}
                              <a href="#privacy" className="text-cyan-400 hover:underline">Privacy Charter</a>.
                            </span>
                          </label>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading || isSuccess}
                        className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 font-bold font-sora text-sm text-slate-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden"
                      >
                        {isLoading ? (
                          <>
                            <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying Credentials...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <FiCheckCircle className="text-lg text-slate-950 animate-bounce" />
                            <span>System Granted!</span>
                          </>
                        ) : (
                          <>
                            {authMode === "login" && <span>Initialize Operations</span>}
                            {authMode === "register" && <span>Establish Command Profile</span>}
                            {authMode === "forgot" && <span>Submit Reset Query</span>}
                            {authMode === "reset" && <span>Apply New Password</span>}
                          </>
                        )}
                        
                        {/* Glow reflection flare on hover */}
                        <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                      </button>

                    </form>

                    {/* SSO Social Logins (Only Login and Register Modes) */}
                    {(authMode === "login" || authMode === "register") && (
                      <div className="mt-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-px bg-slate-800 flex-1"></div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                            or access via
                          </span>
                          <div className="h-px bg-slate-800 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsLoading(true);
                              setTimeout(() => { setIsLoading(false); navigate("/"); }, 1000);
                            }}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 hover:border-white/10 transition-all font-medium text-xs hover:scale-[1.02] cursor-pointer"
                          >
                            <FaGoogle className="text-red-400" />
                            <span>Google Link</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsLoading(true);
                              setTimeout(() => { setIsLoading(false); navigate("/"); }, 1000);
                            }}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 hover:border-white/10 transition-all font-medium text-xs hover:scale-[1.02] cursor-pointer"
                          >
                            <FaGithub className="text-slate-300" />
                            <span>GitHub Link</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Bottom toggles to shift screens */}
                    <div className="mt-8 pt-6 border-t border-slate-850 flex justify-center text-xs text-slate-400">
                      {authMode === "login" && (
                        <span>
                          Operational Profile required?{" "}
                          <button
                            onClick={() => transitionTo("register")}
                            className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                          >
                            Register Profile
                          </button>
                        </span>
                      )}
                      {authMode === "register" && (
                        <span>
                          Operational Profile exists?{" "}
                          <button
                            onClick={() => transitionTo("login")}
                            className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                          >
                            Sign In Profile
                          </button>
                        </span>
                      )}
                      {(authMode === "forgot" || authMode === "reset") && (
                        <button
                          onClick={() => transitionTo("login")}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-medium transition-colors"
                        >
                          <FiArrowLeft />
                          <span>Return to console login</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Security signature footer */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono select-none uppercase tracking-wider">
                <FiShield className="text-emerald-400" />
                <span>Enterprise grade security active</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;