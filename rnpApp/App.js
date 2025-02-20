import { View, StyleSheet, Dimensions, PixelRatio, useWindowDimensions } from "react-native";

import React from "react";
import {
  Appbar,
  Button,
  Card,
  FAB,
  Provider as PaperProvider,
  TextInput,
  Text,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { globalStyles } from "./globalStyles";

const App = () => {
  const { width, height } = Dimensions.get("window");
  const fontSize = PixelRatio.get() > 2 ? 20 : 16;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [text, setText] = React.useState("");
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="React Native Paper App" />
      </Appbar.Header>
      <View style={globalStyles.container}>
        {/* Responsive Inline Styling Kullanımı */}

        <Text style={{ fontSize: fontSize, color: "blue", marginBottom: 10 }}>
          Inline Styling ile Responsive Font
        </Text>
        <Text>
          Ekran Genişliği: {windowWidth} | Ekran Yüksekliği: {windowHeight}
        </Text>

        <Card style={globalStyles.card}>
          <Card.Title title="React Native Paper" />
          <Card.Content>
            <Text>
              Bu, React Native Paper bileşenleri ile oluşturulmuş bir karttır.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log("Butona basıldı")}>
              Daha Fazla
            </Button>
          </Card.Actions>
        </Card>
        <TextInput
          label="Email"
          value={text}
          onChangeText={setText}
          style={globalStyles.textInput}
        />
        <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() => console.log("FAB Pressed")}
        />

        {/* Primary Button */}
        <Button
          mode="contained"
          icon="camera"
          style={globalStyles.button}
          onPress={() => console.log("Primary Button Pressed")}
        >
          Fotoğraf Çek
        </Button>

        {/* Secondary Button */}
        <Button
          mode="outlined"
          icon="account"
          style={globalStyles.button}
          onPress={() => console.log("Secondary Button Pressed")}
        >
          Profil Gör
        </Button>
      </View>
    </PaperProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  responsiveText: {
    fontSize: wp("5%"),
    color: "red",
    marginVertical: hp("2%"),
  },
});
