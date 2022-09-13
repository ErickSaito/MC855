import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import Widget from '../components/Widget';

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <View>
      <Widget></Widget>
    </View>
  );
};

export default HomeScreen;
