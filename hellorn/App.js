import {View, StyleSheet ,SafeAreaView} from "react-native";
import React, { useState } from "react";
import { lightTheme,darkTheme } from "./theme";
import { ThemeProvider, useTheme } from "@rneui/themed";
import RNEText from "./src/RNEText";
import RNEButton from "./src/RNEButton";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.mode === "light" ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemedScreen toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;

const ThemedScreen = ({ toggleTheme }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <RNEText level={3} style={styles.heading}>
        RNEUI Merkezi Tema Yönetimi 🚀
      </RNEText>
      <RNEButton title="Temayı Değiştir" onPress={toggleTheme} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
  },
});

/*import { StyleSheet, View,Text as RNText} from "react-native";
import React, { useState } from "react";
import { Button, createTheme, Input, Text, ThemeProvider } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#007bff",
  },
  darkColors: {
    primary: "#1e1e1e",
  },
  mode: "light", // light veya dark olarak değiştirilebilir
});

const App = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text h3 style={styles.heading}>
          RNEUI Kullanımı
        </Text>
       <RNText>Adınızı girin:</RNText>
        <Input
          placeholder="Adınızı girin"
          value={name}
          onChangeText={setName}
        />

        <Button
          title="Kaydet"
          onPress={() => setDisplayName(name)}
          style={{ marginTop: 20 }}
        />

        {displayName ? (
          <Text h4 style={styles.resultText}>
            Merhaba, {displayName}!
          </Text>
        ) : null}
      </View>
    </ThemeProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
*/
/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Counter from './src/Counter';

const App=()=>{
  return (
    <View style={styles.container}>
      <Text>Hello React Native</Text>
      <Counter/>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
