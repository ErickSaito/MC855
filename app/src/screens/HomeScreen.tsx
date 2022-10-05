import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import type { GeoPosition } from 'react-native-geolocation-service';

import { getCurrentLocation } from '../services/Location';
import WeatherService from '../services/weather.service';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';
import { Weather } from '../types/weather';

type Sentence = {
  sentence: string;
  icon: null;
  widgetColor?: string;
};

// const sentencesMock: Sentence[] = [
//   {
//     sentence:
//       "Today's going to rain, A LOT! \nMake sure to take your umbrella.",
//     icon: null,
//   },
//   {
//     sentence:
//       'The sun is going to be strong at noon. Sunscreen is recommended.',
//     icon: null,
//   },
// ];

const DEFAULT_ERROR_MESSAGE =
  'Ops! There was an error getting the current weather! Please try again';

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [position, setPosition] = useState<GeoPosition | null>(null);

  // change widget color

  const getCurrentWeather = (pos: GeoPosition) => {
    WeatherService.getCurrentWeather({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
      .then(res => setWeather(res))
      .catch(() => {
        setSentences([
          {
            sentence: DEFAULT_ERROR_MESSAGE,
            icon: null,
            widgetColor: 'gray',
          },
        ]);
      });
  };

  useEffect(() => {
    if (position) {
      getCurrentWeather(position);
    } else {
      getCurrentLocation((result, err) => {
        if (err) {
          setSentences([
            {
              sentence: DEFAULT_ERROR_MESSAGE,
              icon: null,
              widgetColor: 'gray',
            },
          ]);
        } else {
          setPosition(result);
        }
      });
    }
  }, [position]);

  const renderInboxItem = ({ item }: ListRenderItemInfo<Sentence>) => {
    return (
      <View className="my-1">
        <Widget
          style={
            item.widgetColor ? { backgroundColor: item.widgetColor } : undefined
          }>
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
