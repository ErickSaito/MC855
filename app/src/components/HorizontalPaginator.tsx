import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

export interface HorizontalPaginatorProps {
  items: JSX.Element[];
}

const HorizontalPaginator = (props: HorizontalPaginatorProps) => {
  const screenDimensions = Dimensions.get('screen');

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled
      decelerationRate="fast"
      disableIntervalMomentum={true}
      className="flex-grow-0 h-3/5"
      bounces={false}>
      {props.items.map((item, index) => {
        return (
          <View
            key={index}
            className="items-center"
            style={{ width: screenDimensions.width }}>
            {item}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HorizontalPaginator;
