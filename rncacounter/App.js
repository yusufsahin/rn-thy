import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { CounterProvider } from "./CounterContext";
import Counter from "./Counter";

const App = () => {
  return (
    <CounterProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Counter />
      </SafeAreaView>
    </CounterProvider>
  );
};

export default App;
