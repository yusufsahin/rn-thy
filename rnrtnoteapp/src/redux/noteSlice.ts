import { Note } from "./../../types/Note";
import axiosInstance from "../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  notes: Note[];
  currentNote: Note | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

// Initial State
const initialState: NoteState = {
  notes: [],
  currentNote: null,
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk<
  Note[],
  void,
  { rejectValue: string }
>("notes/fetchNotes", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/notes");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch notes");
  }
});
// Create Note
export const createNote = createAsyncThunk<Note,Omit<Note, "id">, { rejectValue: string }>(
    "notes/createNote",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/notes", data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to create note");
      }
    }
  );


// Update Note
export const updateNote = createAsyncThunk<Note, Note, { rejectValue: string }>(
    "notes/updateNote",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/notes/${data.id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update note");
      }
    }
  );
 
  export const deleteNote = createAsyncThunk<string, string, { rejectValue: string }>(
    "notes/deleteNote",
    async (id, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`/notes/${id}`);
        return id;  // Return the deleted note's ID
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to delete note");
      }
    }
  );
  

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(createNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = "success";
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        /*const updatedNote = action.payload;
        const existingNote = state.notes.find((note) => note.id === updatedNote.id);
        if (existingNote) {
          existingNote.title = updatedNote.title;
          existingNote.content = updatedNote.content;
        }*/
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.status = "success";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error deleting note";
      });
      ;      
  },
});

export const { setCurrentNote } = noteSlice.actions;
export default noteSlice.reducer;
