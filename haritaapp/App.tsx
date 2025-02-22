import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, ActivityIndicator, Alert, Platform ,Text} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

// 📌 Define background location task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("Background Location Task Error:", error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    console.log("Updated Background Location:", locations[0]);
  }
});

const App = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startLocationTracking();
  }, []);

  const startLocationTracking = async () => {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

      if (foregroundStatus !== "granted" || backgroundStatus !== "granted") {
        Alert.alert("Permission Required", "Background location tracking needs permission.");
        return;
      }

      const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (!isTracking) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update when moved 10 meters
          foregroundService: {
            notificationTitle: "Location Tracking",
            notificationBody: "Your location is being tracked...",
            notificationColor: "#FF5733",
          },
        });
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    } catch (error) {
      console.error("Error starting location tracking:", error);
      setLoading(false);
    }
  };

  const stopLocationTracking = async () => {
    const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (isTracking) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      Alert.alert("Tracking Stopped", "Background location tracking has been stopped.");
    }
  };

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
          <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title="My Location"
          />
        </MapView>
      ) : (
        <View style={styles.errorContainer}>
         <Text>Location data could not be found.</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Start Tracking" onPress={startLocationTracking} />
        <Button title="Stop Tracking" onPress={stopLocationTracking} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: { position: "absolute", bottom: 30, left: 20, right: 20 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default App;




/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './src/screens/MapScreen';

export default function App() {
  return (
    <MapScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
*/