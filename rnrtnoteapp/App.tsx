import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import NotesScreen from './src/screens/NotesScreen';
import NoteForm from './src/screens/NoteForm';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NoteForm" component={NoteForm} options={{ title: "Add / Edit Note" }} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}

export default App
