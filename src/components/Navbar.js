import { Menu, Plus } from "lucide-react";
import { useState, useContext } from "react";
import AddNote from "../modals/AddNote";
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({onMenuClick }) {
  const [openAddNote, setOpenAddNote] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
    <header className={`sticky top-0 z-50 bg-gradient-to-r ${theme.bgGradient} backdrop-blur-xl border-b ${theme.border} shadow-sm`}>
      <div className="flex items-center justify-between px-5 md:px-12 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className={`md:hidden p-2 rounded-lg transition-all duration-200 hover:shadow-sm ${theme.hoverBg}`}
          >
            <Menu size={20} className={theme.accent} />
          </button>

          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.logoBg} flex items-center justify-center text-white text-base font-bold shadow-md hover:shadow-lg transition-shadow duration-300`}>
              N
            </div>

            <div>
              <h1 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${theme.secondary} bg-clip-text text-transparent tracking-tight`}>
                Memos
              </h1>
              <p className={`text-xs ${theme.accentLight} font-medium`}>Your notes, organized</p>
            </div>
          </div>
        </div>

        {/* CENTER - Theme Switcher */}
        <ThemeSwitcher />

        {/* RIGHT */}
        <button
          onClick={()=>{setOpenAddNote(true)}}
          className={`flex items-center gap-2 bg-gradient-to-r ${theme.primary} ${theme.buttonText} px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 font-medium text-sm md:text-base`}
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Note</span>
        </button>

      </div>
    </header>
    <AddNote open ={openAddNote} handleClose={()=>setOpenAddNote(false)}/>
   </>
  );
}

export default Navbar;