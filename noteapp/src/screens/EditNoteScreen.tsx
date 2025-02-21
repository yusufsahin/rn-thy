import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../api/api";

const EditNoteScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const noteContext = useContext(NoteContext);
  const theme = useTheme();

  if (!noteContext) return null;

  const { note } = route.params as { note: Note };
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");

  const { handleUpdateNote } = noteContext;

  const onUpdate = async () => {
    await handleUpdateNote(note.id || "", title, content);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={onUpdate}>
        Update
      </Button>
    </View>
  );
};

export default EditNoteScreen;
