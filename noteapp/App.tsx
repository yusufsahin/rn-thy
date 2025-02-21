import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NoteProvider } from "./src/context/NoteContext";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";
import AddNoteScreen from "./src/screens/AddNoteScreen";
import EditNoteScreen from "./src/screens/EditNoteScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (

      <NoteProvider>
        <MainApp />
      </NoteProvider>

  );
};
function MainApp() {


  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddNote" component={AddNoteScreen} />
          <Stack.Screen name="EditNote" component={EditNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
