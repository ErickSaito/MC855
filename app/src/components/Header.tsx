import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="items-center justify-between flex-row px-5 android:mt-4">
      <Text className="text-white font-zenMaru">Settings</Text>
      <Text className="font-black text-xl text-white font-zenMaru">
        umbrella?
      </Text>
      <Text className="text-white font-zenMaru">Notifications</Text>
    </View>
  );
};

export default Header;
