import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../features/note/noteSlice";
import { X } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

function AddNote({ open, handleClose, editNote }) {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  // 🔁 Handle Create / Update
  function handleData() {
    if (!data.title.trim() || !data.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    // convert input → array
    const tagsArray = tagInput
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    if (editNote) {
      dispatch(
        updateNote({
          id: editNote.id,
          title: data.title,
          description: data.description,
          tags: tagsArray,
        })
      );
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        tags: tagsArray,

        isPinned: false,
        isArchived: false,
        isDeleted: false,

        createdAt: Date.now(),
        lastModified: Date.now(),
      };

      dispatch(addNote(newNote));
    }

    // reset
    setData({
      title: "",
      description: "",
      tags: [],
    });

    setTagInput("");

    handleClose();
  }

  //Prefill when editing
  useEffect(() => {
    if (editNote) {
      setData({
        title: editNote.title,
        description: editNote.description,
        tags: editNote.tags || [],
      });

      setTagInput(editNote.tags?.join(", ") || "");
    } else {
      setData({
        title: "",
        description: "",
        tags: [],
      });

      setTagInput("");
    }
  }, [editNote, open]);

  return (
    <>
      {open && (
        /* Overlay */
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-200"
          onClick={handleClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-br ${theme.bgGradient} rounded-2xl shadow-2xl p-6 md:p-8 border ${theme.border}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editNote ? "Edit Note" : "Create a New Note"}
              </h2>
              <p className={`text-sm ${theme.accent} mt-1`}>
                {editNote ? "Update your note details" : "Add a new note to your collection"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className={`p-2 hover:${theme.bgLight} rounded-lg transition-colors ${theme.accent}`}
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Note Title
              </label>
              <input
                type="text"
                placeholder="Enter your note title..."
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${theme.border} bg-white/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-200`}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Write your note content here..."
                rows={6}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${theme.border} bg-white/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none resize-none transition-all duration-200`}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags (comma separated, e.g: work, important)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${theme.border} bg-white/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-200`}
              />
              <p className="text-xs text-gray-600 mt-1">
                Use commas to separate multiple tags
              </p>
            </div>

            {/* Tags preview */}
            {tagInput.trim() && (
              <div className={`flex flex-wrap gap-2 p-3 ${theme.bgLight} rounded-lg border ${theme.border}`}>
                {tagInput
                  .split(",")
                  .map(tag => tag.trim())
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full ${theme.badge} text-sm font-medium`}
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            )}

            {/* Buttons */}
            <div className={`flex justify-end gap-3 pt-4 border-t ${theme.border}`}>
              <button
                onClick={handleClose}
                className={`px-6 py-2.5 rounded-lg border ${theme.border} text-gray-700 font-medium hover:${theme.bgLight} transition-all duration-200`}
              >
                Cancel
              </button>

              <button
                onClick={handleData}
                className={`px-6 py-2.5 rounded-lg bg-gradient-to-r ${theme.primary} text-white font-medium hover:${theme.primaryHover} transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                {editNote ? "Update Note" : "Create Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNote;