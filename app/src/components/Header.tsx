import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  android: {
    top: 35,
  }
});

const Header = () => {
  if (Platform.OS == 'android')
    return (
      <View style={styles.android} className="items-center justify-between flex-row px-5">
        <Text className="text-white">Settings</Text>
        <Text className="font-bold text-xl text-white">Umbrella?</Text>
        <Text className="text-white">Notifications</Text>
      </View>
    );
  else
    return (
      <View className="items-center justify-between flex-row px-5">
        <Text className="text-white">Settings</Text>
        <Text className="font-bold text-xl text-white">Umbrella?</Text>
        <Text className="text-white">Notifications</Text>
      </View>
    );
};

export default Header;
