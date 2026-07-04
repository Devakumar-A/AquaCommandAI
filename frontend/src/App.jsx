import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import YieldPrediction from "./pages/YieldPrediction";
import WaterDemand from "./pages/WaterDemand";
import ReservoirMonitor from "./pages/ReservoirMonitor";
import Advisory from "./pages/Advisory";
import FarmerManagement from "./pages/FarmerManagement";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/yield" element={<YieldPrediction />} />
        <Route path="/water" element={<WaterDemand />} />
        <Route path="/reservoir" element={<ReservoirMonitor />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/farmers" element={<FarmerManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Login />} />
        <Route path="/auth/forgot-password" element={<Login />} />
        <Route path="/auth/reset-password" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;