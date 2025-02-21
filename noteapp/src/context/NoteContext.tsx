import { createContext, ReactNode, useEffect, useState } from "react";
import { addNote, deleteNote, fetchNotes, updateNote, Note } from "../api/api";

interface NoteContextProps {
  notes: Note[];
  loading: boolean;
  handleAddNote: (title: string, content?: string) => Promise<void>;
  handleUpdateNote: (id: string, title: string, content?: string) => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
}

export const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (title: string, content = "") => {
    try {
      const newNote = await addNote(title, content);
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (id: string, title: string, content = "") => {
    try {
      const updatedNote = await updateNote(id, title, content);
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, loading, handleAddNote, handleUpdateNote, handleDeleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
