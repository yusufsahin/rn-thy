import { StyleSheet, Text, View } from 'react-native'
import React,{ useCallback, useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Device from 'expo-device';
import RNSimData from 'react-native-sim-data';



SplashScreen.preventAutoHideAsync().catch(console.warn);

SplashScreen.setOptions({
  duration: 3000,
  fade: true,
});

interface SimInfo {
  carrierName?: string;
  countryCode?: string;
  mcc?: string;
  mnc?: string;
  // Add more properties as needed from the module's output
}



const App = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [simInfo, setSimInfo] = useState<SimInfo | null>(null);


  useEffect(() => {
    console.log('OS Name:', Device.osName);
    console.log('OS Version:', Device.osVersion);
    try {
      const simData = RNSimData.getSimInfo() as unknown as SimInfo;
      console.log('SIM Data:', simData);
      setSimInfo(simData);
    } catch (error) {
      console.warn('Error fetching SIM info:', error);
    }

    async function prepare(): Promise<void> {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback((): void => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    onLayout={onLayoutRootView}>
    <Text>SplashScreen Demo! 👋</Text>
    <Entypo name="rocket" size={30} />

    <Text style={styles.title}>Device Information</Text>
      <Text style={styles.info}>OS Name: {Device.osName}</Text>
      <Text style={styles.info}>OS Version: {Device.osVersion}</Text>

      <Text style={styles.title}>SIM Information</Text>
      {simInfo ? (
        <Text style={styles.info}>
          {JSON.stringify(simInfo, null, 2)}
        </Text>
      ) : (
        <Text style={styles.info}>SIM information not available.</Text>
      )}


  </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20
  },
  info: {
    fontSize: 16,
    marginBottom: 10
  }
});
