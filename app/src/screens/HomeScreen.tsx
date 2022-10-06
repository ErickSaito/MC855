import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import type { GeoPosition } from 'react-native-geolocation-service';

import { getCurrentLocation } from '../services/Location';
import WeatherService from '../services/weather.service';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';
import { Weather } from '../types/weather';

type Message = {
  message: string;
  icon: null;
  widgetColor?: string;
};

const DEFAULT_ERROR_MESSAGE =
  'Ops! There was an error getting the current weather! Please try again';

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [position, setPosition] = useState<GeoPosition | null>(null);

  const getCurrentWeather = useCallback((pos: GeoPosition) => {
    WeatherService.getWeather({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
      .then(res => {
        setWeather(res);
        if (res) {
          setMessages([
            { message: res.eve.message ?? '', icon: null },
            { message: res.night.message ?? '', icon: null },
            { message: res.tomorrow.message ?? '', icon: null },
          ]);
        } else {
          setMessages([]);
        }
      })
      .catch(err => {
        console.log(err);
        setMessages([
          {
            message: DEFAULT_ERROR_MESSAGE,
            icon: null,
            widgetColor: 'gray',
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (position) {
      getCurrentWeather(position);
    } else {
      getCurrentLocation((result, err) => {
        if (err) {
          setMessages([
            {
              message: DEFAULT_ERROR_MESSAGE,
              icon: null,
              widgetColor: 'gray',
            },
          ]);
        } else {
          setPosition(result);
        }
      });
    }
  }, [getCurrentWeather, position]);

  const renderInboxItem = ({ item }: ListRenderItemInfo<Message>) => {
    return (
      <View className="my-1">
        <Widget
          style={
            item.widgetColor ? { backgroundColor: item.widgetColor } : undefined
          }>
          <View>
            <Text className="text-center text-white text-base font-medium font-zenKakuNew">
              {item.message}
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
            data={messages}
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
