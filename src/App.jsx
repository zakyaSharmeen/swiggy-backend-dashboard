import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./vendorDashboard/components/pages/LandingPage";
import NotFound from "./vendorDashboard/components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>


      </Routes>
    </>
  );
}

export default App;
