import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const Widget: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <View className="bg-purple-dark rounded-2xl px-5 py-6 mb-2">
      {children}
    </View>
  );
};

export default Widget;
