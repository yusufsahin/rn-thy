import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginVertical: 10,
    padding: 10,
  },
  textInput: {
    width: "90%",
    marginBottom: 16,
  },
  button: {
    width: "90%",
    marginVertical: 8,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
