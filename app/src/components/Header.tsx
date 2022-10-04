import React from 'react';
import { Image, Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="items-center justify-between flex-row px-5 android:top-9">
      <Image
        source={require('../../assets/settings.png')}
        className="w-7 h-7"
      />
      <Text className="font-black text-xl text-white font-zenMaru">
        umbrella?
      </Text>
      <Image source={require('../../assets/inbox.png')} className="w-7 h-7" />
    </View>
  );
};

export default Header;
