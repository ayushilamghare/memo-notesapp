import { FileText, Archive, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setView, setTag } from "../features/note/noteSlice";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { notes, view } = useSelector((state) => state.note);
    const { theme } = useContext(ThemeContext);

    const activeCount = notes.filter(n => !n.isDeleted && !n.isArchived).length;
    const archivedCount = notes.filter(n => n.isArchived && !n.isDeleted).length;
    const trashCount = notes.filter(n => n.isDeleted).length;

    const allTags = notes.flatMap(note => note.tags || []);
    const uniqueTags = [...new Set(allTags)];

    const menu = [
        { label: "Notes", icon: <FileText size={18} />, value: "notes", count: activeCount },
        { label: "Archived", icon: <Archive size={18} />, value: "archived", count: archivedCount },
        { label: "Trash", icon: <Trash2 size={18} />, value: "trash", count: trashCount },
    ];

    return (
        <>
            {/* ✅ OVERLAY (OUTSIDE sidebar) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* ✅ SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b ${theme.bgLight} ${theme.bgLight} backdrop-blur-xl border-r ${theme.border} p-4 transform transition-transform duration-300 flex flex-col shadow-sm
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
            >
                {/* Close button (mobile) */}
                <button
                    onClick={onClose}
                    className="md:hidden mb-4 text-blue-500 hover:text-blue-700 transition-colors"
                >
                    ✕
                </button>

                {/* App Name */}
                <div className="mb-8">
                    <h1 className={`text-lg font-bold bg-gradient-to-r ${theme.secondary} bg-clip-text text-transparent px-2`}>
                        NoteNest
                    </h1>
                    <p className={`text-xs ${theme.accentLight} px-2 mt-1`}>Organize your thoughts</p>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-1">
                    {menu.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => {
                                dispatch(setView(item.value));
                                dispatch(setTag(null));
                                onClose();
                            }}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 font-medium
                ${view === item.value
                                    ? `bg-gradient-to-r ${theme.primary} text-white shadow-sm`
                                    : `${theme.accent} ${theme.hoverBg}`
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </div>

                            <span className={`text-xs px-2 py-1 rounded-full ${
                                view === item.value
                                    ? "bg-white/30"
                                    : theme.badge
                            }`}>{item.count}</span>
                        </button>
                    ))}
                </div>

                {/* Tags */}
                <div className="mt-8 flex-1">
                    <div className="flex items-center justify-between px-2 mb-3">
                        <p className={`text-xs font-bold ${theme.accentLight} uppercase tracking-wider`}>Tags</p>

                        <button
                            onClick={() => {
                                dispatch(setTag(null));
                                onClose();
                            }}
                            className={`text-xs ${theme.accent} hover:underline font-semibold transition-colors`}
                        >
                            View All
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 px-2 max-h-96 overflow-y-auto">
                        {uniqueTags.length > 0 ? (
                            uniqueTags.map((tag) => (
                                <span
                                    key={tag}
                                    onClick={() => {
                                        dispatch(setTag(tag));
                                        onClose();
                                    }}
                                    className={`px-3 py-1.5 text-xs rounded-full ${theme.badge} ${theme.accent} hover:opacity-80 cursor-pointer transition-all duration-200 font-medium hover:shadow-sm`}
                                >
                                    #{tag}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 italic">No tags yet</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;