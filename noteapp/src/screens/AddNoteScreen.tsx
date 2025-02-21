import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { NoteContext } from "../context/NoteContext";

const AddNoteScreen = ({ navigation }: { navigation: any }) => {
  const noteContext = useContext(NoteContext);
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!noteContext) return null;
  const { handleAddNote } = noteContext;

  const onSave = async () => {
    await handleAddNote(title, content);
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
      <Button mode="contained" onPress={onSave}>
        Save
      </Button>
    </View>
  );
};

export default AddNoteScreen;
