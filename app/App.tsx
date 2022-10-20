import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { requestLocationPermissions } from './src/services/Location';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import Background from './src/components/Background';

dayjs.extend(tz);
dayjs.extend(utc);

const App = () => {
  const [requestedAuthorization, setRequestedAuthorization] = useState(false);

  useEffect(() => {
    if (!requestedAuthorization) {
      requestLocationPermissions().then(() => {
        setRequestedAuthorization(true);
      });
    } else {
      RNBootSplash.hide({ fade: true });
    }
  }, [requestedAuthorization]);

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
