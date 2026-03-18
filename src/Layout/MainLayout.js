import AllNotes from "../components/AllNotes";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`h-screen flex flex-col bg-gradient-to-br ${theme.bgGradient}`}>

      {/* Navbar (top) */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Bottom Section */}
      <div className="flex flex-1 overflow-hidden">

       <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <MainContent/>
          </div>
        </main>

      </div>
    </div>
  );
}

export default MainLayout;