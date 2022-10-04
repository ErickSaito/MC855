import React from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { useLocationPermissions } from './src/hooks/useLocation';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import Background from './src/components/Background';

const App = () => {
  useLocationPermissions().then(() => {
    RNBootSplash.hide({ fade: true });
  });

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
