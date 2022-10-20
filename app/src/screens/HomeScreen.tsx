import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import type { GeoPosition, GeoError } from 'react-native-geolocation-service';

import { getCurrentLocation } from '../services/Location';
import WeatherService from '../services/weather.service';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';

import settingsIcon from '../../assets/settings.png';
import sunnyIcon from '../../assets/sunny.png';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [position, setPosition] = useState<GeoPosition | null>(null);

  const getCurrentWeather = useCallback(async (pos: GeoPosition) => {
    setLoading(true);
    try {
      const res = await WeatherService.getWeather({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setMessages([
        {
          message: res.message,
          icon: res.rain ? (
            <Image source={rainyIcon} className="w-7 h-7" />
          ) : (
            <Image source={sunnyIcon} className="w-7 h-7" />
          ),
        },
      ]);
    } catch {
      setMessages([DEFAULT_ERROR_MESSAGE]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (position) {
      getCurrentWeather(position);
      syncDeviceToken(); // Sync Device Token when location is found
    } else {
      const callback = (result: GeoPosition | null, err?: GeoError): void => {
        if (err) {
          setMessages([DEFAULT_ERROR_MESSAGE]);
        } else {
          setPosition(result);
        }
      };
      getCurrentLocation(callback);
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

  const renderInboxComponent = () => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
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
      />
    );
  };

  return (
    <View className="flex-1 justify-center">
      <HorizontalPaginator items={[renderInboxComponent()]} />
    </View>
  );
};

export default HomeScreen;
