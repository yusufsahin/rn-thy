import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { setCurrentNote, deleteNote, fetchNotes } from "../redux/noteSlice";

// Define the RootStackParamList type
type RootStackParamList = {
  NoteForm: undefined;
  // Add other screens here if needed
};

const NotesScreen = () => {
  const { notes, status, error } = useSelector(
    (state: RootState) => state.notes
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  React.useEffect(() => {
    // Fetch notes when the screen is loaded
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Notes</Text>

      {/* Show loading indicator when fetching */}
      {status === "loading" && <ActivityIndicator size="large" color="blue" />}

      {/* Show error message if fetching fails */}
      {status === "failed" && (
        <Text style={styles.errorText}>{error || "Failed to load notes."}</Text>
      )}

      {/* Show list only when successful */}
      {status === "success" && notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Edit"
                  onPress={() => {
                    dispatch(setCurrentNote(item));
                    navigation.navigate("NoteForm");
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => dispatch(deleteNote(item.id!))}
                  color="red"
                />
              </View>
            </View>
          )}
        />
      ) : status === "success" && notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes found. Add a new one!</Text>
      ) : null}

      <Button
        title="Add Note"
        onPress={() => navigation.navigate("NoteForm")}
      />
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noteItem: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  noteTitle: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
  emptyText: { textAlign: "center", fontSize: 16, marginTop: 20 },
});
