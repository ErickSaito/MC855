import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import topography from '../assets/topography75.png';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

const Background = (props: { children: ReactNode }) => {
  return (
    <ImageBackground
      source={topography}
      style={styles.image}
      resizeMode="repeat">
      {props.children}
    </ImageBackground>
  );
};

export default Background;
