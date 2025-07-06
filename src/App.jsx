import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import FloatingContactForm from "../src/pages/ContactPage";

// const [isDarkMode, setIsDarkMode] = useState(true);

// useEffect(() => {
//   document.body.className = isDarkMode ? "dark-mode" : "light-mode";
// }, [isDarkMode]);
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <div>
          <Outlet />
        </div>
        <FloatingContactForm />
      </div>
    </div>
  );
}

export default AppLayout;
