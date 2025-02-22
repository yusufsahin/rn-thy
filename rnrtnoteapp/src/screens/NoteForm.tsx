import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { updateNote, createNote, setCurrentNote } from "../redux/noteSlice";

const NoteForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation();

  const { currentNote } = useSelector((state: RootState) => state.notes);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { title: "", content: "" },
  });

  useEffect(() => {
    if (currentNote) {
      reset({ title: currentNote.title, content: currentNote.content });
    }
  }, [currentNote, reset]);

  const onSubmit = (data: any) => {
    if (!data.title.trim()) {
      Alert.alert("Error", "Title is required.");
      return;
    }

    if (currentNote) {
        dispatch(updateNote({ ...currentNote, ...data }));
      } else {
        dispatch(createNote({ title: data.title, content: data.content }));
      }
  
      dispatch(setCurrentNote(null)); // Reset selected note
      reset();
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {currentNote ? "Edit Note" : "Create Note"}
      </Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              placeholder="Title"
              style={[styles.input, fieldState.error && styles.errorInput]}
              onChangeText={field.onChange}
              value={field.value}
            />
            {fieldState.error && (
              <Text style={styles.errorText}>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <TextInput
            placeholder="Content (optional)"
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            multiline
          />
        )}
      />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 5 },
});
