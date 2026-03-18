import { createSlice } from "@reduxjs/toolkit";

const loadNotesFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("notes")) || [];

    return data.map((note) => ({
      ...note,
      isPinned: note.isPinned ?? false,
      isArchived: note.isArchived ?? false,
      isDeleted: note.isDeleted ?? false,
      tags: note.tags ?? [],
    }));
  } catch {
    return [];
  }
};

const saveNotesToStorage = (notes) => {
    try {
        localStorage.setItem("notes", JSON.stringify(notes));
    } catch {
        // fail silently
    }
};

const initialState = {

  notes: loadNotesFromStorage(), // ✅ no fallback

  view: "notes",
  selectedTag: null,
  searchQuery: "",
  sortBy: "none",

};

const noteSlice = createSlice({
    name: "note",
    initialState,

    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
            saveNotesToStorage(state.notes);
        },

        togglePin: (state, action) => {
            const note = state.notes.find((n) => n.id === action.payload);
            if (note) {
                note.isPinned = !note.isPinned;
                note.lastModified = Date.now();
            }
            saveNotesToStorage(state.notes);
        },

        deleteNote: (state, action) => {
            const note = state.notes.find((n) => n.id === action.payload);
            if (note) {
                note.isDeleted = true;
                note.isArchived = false;
            }
            saveNotesToStorage(state.notes);
        },

        archiveNote: (state, action) => {
            const note = state.notes.find((n) => n.id === action.payload);
            if (note) {
                note.isArchived = true;
                note.isDeleted = false;
            }
            saveNotesToStorage(state.notes);
        },

        restoreNote: (state, action) => {
            const note = state.notes.find((n) => n.id === action.payload);
            if (note) {
                note.isDeleted = false;
                note.isArchived = false;
            }
            saveNotesToStorage(state.notes);
        },

        setView: (state, action) => {
            state.view = action.payload;
        },

        updateNote: (state, action) => {
            const { id, title, description, tags } = action.payload;

            const note = state.notes.find((n) => n.id === id);

            if (note) {
                note.title = title;
                note.description = description;
                note.tags = tags;
                note.lastModified = Date.now();
            }

            saveNotesToStorage(state.notes);
        },

        permanentDelete: (state, action) => {
            state.notes = state.notes.filter((n) => n.id !== action.payload);
            saveNotesToStorage(state.notes);
        },

        setTag: (state, action) => {
            state.selectedTag = action.payload;
        },

        setSearch: (state, action) => {
            state.searchQuery = action.payload;
        },

        setSort: (state, action) => {
            state.sortBy = action.payload;
        },
    },
});

export const {
    addNote,
    togglePin,
    updateNote,
    deleteNote,
    archiveNote,
    restoreNote,
    setView,
    permanentDelete,
    setTag,
    setSearch,
    setSort,
} = noteSlice.actions;

export default noteSlice.reducer;