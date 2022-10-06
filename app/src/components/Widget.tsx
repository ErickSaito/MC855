import React, { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

const Widget: React.FC<PropsWithChildren<{ style?: StyleProp<ViewStyle> }>> = ({
  children,
  style,
}) => {
  return (
    <View style={style} className="bg-purple-dark rounded-2xl px-5 py-6 mb-2">
      {children}
    </View>
  );
};

export default Widget;
