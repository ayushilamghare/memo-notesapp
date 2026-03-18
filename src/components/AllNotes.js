import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import PushPinIcon from "@mui/icons-material/PushPin";
import UndoIcon from "@mui/icons-material/Undo";

import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";

import { addNote, togglePin, deleteNote, archiveNote, permanentDelete, restoreNote }
    from "../features/note/noteSlice";

function AllNotes({ note, onEdit }) {
    const [hoveredId, setHoveredId] = useState(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    return (
        <div className="group" onClick={() => onEdit(note)}>
            <div
                className={`relative flex flex-col justify-between h-[240px] rounded-xl p-5 transition-all duration-300 cursor-pointer
          ${note.isPinned
                        ? `bg-gradient-to-br ${theme.bgLight} border ${theme.border} shadow-md hover:shadow-lg`
                        : `bg-white/70 border ${theme.border} shadow-sm hover:shadow-md hover:-translate-y-1`
                    }
        `}
                onMouseEnter={() => setHoveredId(note.id)}
                onMouseLeave={() => setHoveredId(null)}
            >
                {/* Top Section */}
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-indigo-900 text-base leading-tight line-clamp-1 flex-1">
                            {note.title}
                        </h3>

                        {(note.isPinned || hoveredId === note.id) && (
                            <PushPinIcon
                                fontSize="small"
                                className={`cursor-pointer transition flex-shrink-0 ml-2 ${note.isPinned
                                    ? "text-blue-500"
                                    : "text-blue-400 hover:text-blue-500"
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(togglePin(note.id))
                                }
                                }
                            />
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {note.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {note.tags?.slice(0, 3).map((tag, i) => {
                            const colors = [
                                "bg-blue-100 text-blue-700",
                                "bg-indigo-100 text-indigo-700",
                                "bg-rose-100 text-rose-700",
                                "bg-cyan-100 text-cyan-700",
                                "bg-orange-100 text-orange-700",
                            ];
                            const colorClass = colors[i % colors.length];
                            return (
                                <span
                                    key={i}
                                    className={`px-2.5 py-1 text-xs rounded-full font-medium ${colorClass}`}
                                >
                                    #{tag}
                                </span>
                            );
                        })}
                        {note.tags?.length > 3 && (
                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${theme.badge}`}>
                                +{note.tags.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-gray-600 text-xs mt-4 pt-3 border-t border-gray-200">
                    {/* Dates */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 hover:text-indigo-700 transition">
                            <AccessTimeIcon fontSize="inherit" />
                            <span className="font-medium">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <span className="text-blue-300">•</span>

                        <div className="flex items-center gap-1 hover:text-indigo-700 transition">
                            <EditCalendarIcon fontSize="inherit" />
                            <span className="font-medium">
                                {new Date(note.lastModified).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white px-2 py-1 rounded-lg">

                        {/* 🗑 TRASH VIEW */}
                        {note.isDeleted ? (
                            <>
                                {/* 🔄 Restore */}
                                <UndoIcon
                                    fontSize="small"
                                    className="cursor-pointer text-green-500 hover:text-green-700 transition hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(restoreNote(note.id));
                                    }}
                                    title="Restore"
                                />

                                {/* ❌ Permanent Delete */}
                                <DeleteIcon
                                    fontSize="small"
                                    className="cursor-pointer text-red-500 hover:text-red-700 transition hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        const confirmDelete = window.confirm(
                                            "Permanently delete this note?"
                                        );

                                        if (confirmDelete) {
                                            dispatch(permanentDelete(note.id));
                                        }
                                    }}
                                    title="Delete permanently"
                                />
                                />
                            </>
                        ) : (
                            <>
                                {/* 🗑 Normal Delete */}
                                <DeleteIcon
                                    fontSize="small"
                                    className="cursor-pointer text-red-500 hover:text-red-700 transition hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(deleteNote(note.id));
                                    }}
                                    title="Delete"
                                />

                                {/* 📦 Archive / Undo Archive */}
                                {note.isArchived ? (
                                    <UndoIcon
                                        fontSize="small"
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition hover:scale-110"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(restoreNote(note.id));
                                        }}
                                        title="Unarchive"
                                    />
                                ) : (
                                    <ArchiveIcon
                                        fontSize="small"
                                        className="cursor-pointer text-blue-500 hover:text-indigo-700 transition hover:scale-110"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(archiveNote(note.id));
                                        }}
                                        title="Archive"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllNotes;