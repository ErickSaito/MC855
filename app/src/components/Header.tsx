import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="items-center justify-between flex-row px-5">
      <Text className="">Settings</Text>
      <Text className="font-bold text-xl">Umbrella?</Text>
      <Text className="">Notifications</Text>
    </View>
  );
};

export default Header;
