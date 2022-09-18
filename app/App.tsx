import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';

// NativeWindStyleSheet.setColorScheme('dark');

const App = () => {
  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
