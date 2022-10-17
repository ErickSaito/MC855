import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import type { GeoPosition } from 'react-native-geolocation-service';

import { getCurrentLocation } from '../services/Location';
import WeatherService from '../services/weather.service';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';

import settingsIcon from '../../assets/settings.png';
import sunnyIcon from '../../assets/rainy.png';
import rainyIcon from '../../assets/rainy.png';

type Message = {
  message: string;
  icon?: JSX.Element;
  widgetColor?: string;
};

const DEFAULT_ERROR_MESSAGE: Message = {
  message:
    'Ops! There was an error getting the current weather! Please try again.',
  icon: <Image source={settingsIcon} className="w-7 h-7" />, // FIXME add error icon
  widgetColor: 'gray',
};

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [position, setPosition] = useState<GeoPosition | null>(null);

  const getCurrentWeather = useCallback((pos: GeoPosition) => {
    WeatherService.getWeather({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
      .then(res =>
        res
          ? setMessages([
              {
                message: res.message,
                icon: res.rain ? (
                  <Image source={rainyIcon} className="w-7 h-7" />
                ) : undefined,
              },
            ])
          : setMessages([]),
      )
      .catch(() => setMessages([DEFAULT_ERROR_MESSAGE]));
  }, []);

  useEffect(() => {
    if (position) {
      getCurrentWeather(position);
    } else {
      getCurrentLocation((result, err) =>
        err ? setMessages([DEFAULT_ERROR_MESSAGE]) : setPosition(result),
      );
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
            <View className="items-center mt-2">{item.icon ?? null}</View>
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
