import React, { useEffect, useMemo, useState } from 'react';

import { Alert, Platform, SafeAreaView, StatusBar, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import Background from './src/components/Background';
import { useGeolocationPermissions } from './src/hooks/useGeolocationPermissions';

const App = () => {
  setTimeout(() => {
    RNBootSplash.hide({ fade: true });
  }, 500);

  const locationAccess = useMemo(async () => {
    const locationPermissions = await useGeolocationPermissions();
    Alert.alert('Location Accesss Result', locationPermissions.toString())
    return locationPermissions;
  }, []);

  if (Platform.OS === 'android') {
    return (
      <View className="flex-1 border-b-0 bottom-0">
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Background>
          <Header />
          <HomeScreen />
        </Background>
      </View>
    );
  } else {
    return (
      <View className="flex-1 border-b-0 bottom-0">
        <Background>
          <SafeAreaView className="flex-1">
            <StatusBar
              barStyle={'light-content'}
              backgroundColor="transparent"
              translucent={true}
            />
            <Header />
            <HomeScreen />
          </SafeAreaView>
        </Background>
      </View>
    );
  }
};

export default App;
