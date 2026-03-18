import { useSelector } from "react-redux";
import AllNotes from "./AllNotes";
import { useState, useContext } from "react";
import AddNote from "../modals/AddNote";
import { useDispatch } from "react-redux";
import { setSearch, setSort } from "../features/note/noteSlice";
import { Search, ArrowUpDown } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

function MainContent() {
    const { notes, view, selectedTag, searchQuery, sortBy } = useSelector((state) => state.note);
    const [openModal, setOpenModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    // filter based on view
    let filteredNotes = [];

    if (view === "notes") {
        filteredNotes = notes.filter(
            (n) => !n.isDeleted && !n.isArchived
        );
    }

    if (view === "archived") {
        filteredNotes = notes.filter(
            (n) => n.isArchived && !n.isDeleted
        );
    }

    if (view === "trash") {
        filteredNotes = notes.filter((n) => n.isDeleted);
    }

    if (selectedTag) {
        filteredNotes = filteredNotes.filter((note) =>
            note.tags.includes(selectedTag)
        );
    }

    if (searchQuery && searchQuery.trim()) {
        filteredNotes = filteredNotes.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (sortBy === "title") {
        filteredNotes = [...filteredNotes].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortBy === "description") {
        filteredNotes = [...filteredNotes].sort((a, b) =>
            a.description.localeCompare(b.description)
        );
    }

    // split pinned + others
    const pinned = filteredNotes.filter((n) => n.isPinned);
    const others = filteredNotes.filter((n) => !n.isPinned);

    return (
        <div className="px-2 sm:px-4 md:px-6 py-4 sm:py-8">

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8">

                {/* Search */}
                <div className="flex-1 min-w-0 relative">
                    <Search className={`absolute left-3 top-3 sm:top-3.5 ${theme.accent}`} size={18} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        className={`w-full pl-10 pr-3 py-2 sm:pl-12 sm:pr-4 sm:py-3 rounded-lg border ${theme.border} bg-white/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-200 shadow-sm hover:shadow-md text-sm`}
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <ArrowUpDown size={18} className={theme.accent} />
                    <select
                        value={sortBy}
                        onChange={(e) => dispatch(setSort(e.target.value))}
                        className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${theme.border} bg-white/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-200 shadow-sm hover:shadow-md font-medium ${theme.accent} text-sm`}
                    >
                        <option value="none">Sort</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="description">Description</option>
                    </select>
                </div>

            </div>

            {/*Pinned Section */}
            {pinned.length > 0 && (
                <>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${theme.primary}`}></div>
                        <h2 className={`text-sm font-bold ${theme.accent} uppercase tracking-wider`}>📌 Pinned</h2>
                        <span className={`text-xs ${theme.badge} px-2 py-1 rounded-full font-semibold`}>
                            {pinned.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                        {pinned.map((note) => (
                            <AllNotes
                                key={note.id}
                                note={note}
                                onEdit={(note) => {
                                    console.log("CLICKED", note);
                                    setSelectedNote(note);
                                    setOpenModal(true);
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/*Other Notes */}
            {others.length > 0 && (
                <>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${theme.primary}`}></div>
                        <h2 className={`text-sm font-bold ${theme.accent} uppercase tracking-wider`}>
                            {pinned.length ? "📝 Other Notes" : "📝 Notes"}
                        </h2>
                        <span className={`text-xs ${theme.badge} px-2 py-1 rounded-full font-semibold`}>
                            {others.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {others.map((note) => (
                            <AllNotes
                                key={note.id}
                                note={note}
                                onEdit={(note) => {
                                    console.log("CLICKED", note);
                                    setSelectedNote(note);
                                    setOpenModal(true);
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Empty State */}
            {filteredNotes.length === 0 && (
                <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl border-2 border-dashed ${theme.border} bg-gradient-to-br ${theme.bgGradient}`}>
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No notes found</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-sm">
                        {searchQuery 
                            ? `Couldn't find any notes matching "${searchQuery}". Try a different search.`
                            : selectedTag
                            ? `No notes with tag "${selectedTag}". Create one or try a different tag.`
                            : view === "archived"
                            ? "You haven't archived any notes yet. Archive your important notes for later!"
                            : view === "trash"
                            ? "Your trash is empty. All your notes are safe!"
                            : "No notes yet. Create your first note to get started!"}
                    </p>
                    <button
                        onClick={() => {
                            dispatch(setSearch(""));
                            dispatch(setSort("none"));
                        }}
                        className={`px-6 py-2.5 bg-gradient-to-r ${theme.primary} text-white rounded-lg font-medium hover:${theme.primaryHover} transition-all duration-200 shadow-md hover:shadow-lg`}
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            <AddNote
                open={openModal}
                handleClose={() => {
                    setOpenModal(false);
                    setSelectedNote(null);
                }}
                editNote={selectedNote}
            />
        </div>
    );
}

export default MainContent;