import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const Widget: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <View className="bg-purple-dark rounded-xl px-5 py-10">{children}</View>
  );
};

export default Widget;
