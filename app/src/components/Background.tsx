import React, { ReactNode } from 'react';
import { ImageBackground } from 'react-native';
import topography from '../../assets/topography75.png';

const Background = (props: { children: ReactNode }) => {
  return (
    <ImageBackground source={topography} className="flex-1" resizeMode="repeat">
      {props.children}
    </ImageBackground>
  );
};

export default Background;
