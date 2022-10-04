import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import type { GeoPosition } from 'react-native-geolocation-service';

import { useCurrentLocation } from '../hooks/useLocation';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';
import WeatherService from '../services/weather.service';
import { Weather } from '../types/weather';

type Sentence = {
  sentence: string;
  icon: null;
};

const sentencesMock: Sentence[] = [
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
  const [sentences, setSentences] = useState<Sentence[]>(sentencesMock);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [position, setPosition] = useState<GeoPosition | null>(null);

  // change widget color

  useEffect(() => {
    try {
      if (position) {
        WeatherService.getCurrentWeather({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }).then(res => setWeather(res));
      } else {
        throw new Error();
      }
    } catch (err) {
      setSentences([
        {
          sentence:
            'Ops! There was an error getting the current weather! Please try again',
          icon: null,
        },
      ]);
    }
  }, [position]);

  useCurrentLocation((result: GeoPosition) => setPosition(result));

  const renderInboxItem = ({ item }: ListRenderItemInfo<Sentence>) => {
    return (
      <View className="my-1">
        <Widget>
          <View>
            <Text className="text-center text-white text-base font-medium font-zenKakuNew">
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
      <HorizontalPaginator
        items={[
          <FlatList
            className="w-3/4"
            ListHeaderComponent={
              <Text className="font-bold text-2xl text-white font-zenKakuNew mb-4">
                Inbox
              </Text>
            }
            data={sentences}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderInboxItem}
            bounces={false}
          />,
          <Text className="font-bold text-2xl text-white font-zenKakuNew mb-4">
            Details
          </Text>,
        ]}
      />
    </View>
  );
};

export default HomeScreen;
