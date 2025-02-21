
import { View, Text, FlatList  } from 'react-native'
import React, { useContext } from 'react'
import { NoteContext } from '../context/NoteContext';
import { List, Switch,Button,useTheme } from 'react-native-paper';

const HomeScreen = ({navigation}:{navigation:any}) => {

    const noteContext = useContext(NoteContext);

    const theme = useTheme();



    if (!noteContext) return null;
    const { notes, loading, handleDeleteNote } = noteContext;



  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      {loading ? (
        <List.Item title="Loading..." />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id || ""}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.content}
              onPress={() => navigation.navigate("EditNote", { note: item })}
              right={() => (
                <Button onPress={() => handleDeleteNote(item.id || "")} mode="text">
                  Delete
                </Button>
              )}
            />
          )}
        />
      )}
      <Button mode="contained" onPress={() => navigation.navigate("AddNote")}>
        Add Note
      </Button>
    </View>
  )
}

export default HomeScreen
