import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, ScrollView, View } from 'react-native';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import Background from './src/components/Background';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    borderBottomWidth: 0, // removes the border on the bottom
    bottom: 0
  },
});
const App = () => {
  if (Platform.OS === 'android')
    return (
      <View style={styles.view}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        <Background>
          <Header />
          <HomeScreen />
        </Background>
      </View>
    );
  else
    return (
      <View style={styles.view}>
        <Background>
          <SafeAreaView className="flex-1">
            <StatusBar
              barStyle={'light-content'}
              backgroundColor="transparent"
              translucent={true}
            />
            <Header />
            <HomeScreen />
          </SafeAreaView >
        </Background>
      </View>
    );
};

export default App;
