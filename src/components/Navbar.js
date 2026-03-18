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
      <div className="flex items-center justify-between px-3 sm:px-5 md:px-12 py-3 sm:py-4 gap-2 sm:gap-4 overflow-x-auto">

        {/* LEFT */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-fit">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className={`md:hidden p-2 rounded-lg transition-all duration-200 hover:shadow-sm ${theme.hoverBg}`}
          >
            <Menu size={20} className={theme.accent} />
          </button>

          {/* Logo + Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-fit">
            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br ${theme.logoBg} flex items-center justify-center text-white text-xs sm:text-base font-bold shadow-md hover:shadow-lg transition-shadow duration-300`}>
              N
            </div>

            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${theme.secondary} bg-clip-text text-transparent tracking-tight`}>
                Memos
              </h1>
              <p className={`text-xs ${theme.accentLight} font-medium`}>Your notes, organized</p>
            </div>
          </div>
        </div>

        {/* CENTER - Theme Switcher */}
        <div className="flex flex-shrink-0">
          <ThemeSwitcher />
        </div>

        {/* RIGHT */}
        <button
          onClick={()=>{setOpenAddNote(true)}}
          className={`flex items-center gap-1 sm:gap-2 bg-gradient-to-r ${theme.primary} ${theme.buttonText} px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0`}
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">New Note</span>
          <span className="sm:hidden">New</span>
        </button>

      </div>
    </header>
    <AddNote open ={openAddNote} handleClose={()=>setOpenAddNote(false)}/>
   </>
  );
}

export default Navbar;