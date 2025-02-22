import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("İzin Gerekli", "Konum erişimi olmadan harita çalışmaz!");
        setLoading(false);
        return;
      }

      const subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation);
          setLoading(false);
        }
      );

      return () => subscription.remove();
    })();
  }, []);
  return (
    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="blue" />
    ) : location ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Benim Konumum" />
      </MapView>
    ) : (
      <Text>Konum alınamadı.</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
