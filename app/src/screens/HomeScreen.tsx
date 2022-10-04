import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useCurrentLocation, useLocationPermissions } from '../hooks/useLocation';
import Widget from '../components/Widget';

import type { GeoPosition } from 'react-native-geolocation-service';

type Sentence = {
  sentence: string;
  icon: null;
};

const sentences: Sentence[] = [
  {
    sentence:
      "Today's going to rain, A LOT! \nMake sure to take your umbrella.",
    icon: null,
  },
  {
    sentence:
      'The sun is going to be strong at noon. Sunscreen is recommended.',
    icon: null,
  },
];

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  const screenDimensions = Dimensions.get('screen');
  const [position, setPosition] = useState({} as GeoPosition);
  useCurrentLocation((result: GeoPosition) => setPosition(result));

  useEffect(() => {
    if (Object.keys(position).length > 0)
      Alert.alert('Current location:', JSON.stringify(position));
  }, [position]);

  const renderInboxItem = ({ item }: ListRenderItemInfo<Sentence>) => {
    return (
      <View className="my-1">
        <Widget>
          <View>
            <Text className="text-center text-white font-medium font-zenKakuNew">
              {item.sentence}
            </Text>
            {item.icon ? <Text>Icon</Text> : null}
          </View>
        </Widget>
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center">
      <ScrollView
        horizontal={true}
        pagingEnabled
        decelerationRate="fast"
        disableIntervalMomentum={true}
        className="flex-grow-0 h-3/5"
        bounces={false}>
        <View
          className="items-center"
          style={{ width: screenDimensions.width }}>
          <FlatList
            className="w-3/4"
            ListHeaderComponent={
              <Text className="font-bold text-xl text-white font-zenKakuNew">
                Inbox
              </Text>
            }
            data={sentences}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderInboxItem}
            bounces={false}
          />
        </View>
        <View
          className="items-center"
          style={{ width: screenDimensions.width }}>
          <Text className="font-bold text-xl text-white font-zenKakuNew">
            Details
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
