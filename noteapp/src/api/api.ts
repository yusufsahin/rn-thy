export interface Note {
  id?: string; //Optional
  title: string;
  content?: string; //Optional
}

const API_URL = "http://192.168.1.8:3000/notes";

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};
export const addNote = async (title: string, content: string): Promise<Note> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    return await response.json();
  };

  export const updateNote = async (id: string, title: string, content: string): Promise<Note> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id,title, content }),
    });
    return await response.json();
  };

  export const deleteNote = async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  };