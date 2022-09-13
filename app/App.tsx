import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HomeScreen />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
