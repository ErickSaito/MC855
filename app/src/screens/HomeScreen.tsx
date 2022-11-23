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
import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import { getTimeZone } from 'react-native-localize';

import { getCurrentLocation } from '../services/Location';
import WeatherService from '../services/weather.service';
import DeviceService from '../services/device.service';
import HorizontalPaginator from '../components/HorizontalPaginator';
import Widget from '../components/Widget';
import { Weather } from '../types/weather';

import settingsIcon from '../../assets/settings.png';
import sunnyIcon from '../../assets/sunny.png';
import rainyIcon from '../../assets/rainy.png';
import windIcon from '../../assets/wind.png';
import leafIcon from '../../assets/leaf.png';
import heatIcon from '../../assets/heat.png';
import coldIcon from '../../assets/cold.png';
import deadIcon from '../../assets/dead.png';
import halfSunIcon from '../../assets/half-sun.png';
import lowUvIcon from '../../assets/low-uv.png';
import shieldIcon from '../../assets/shield.png';

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

const getWeatherIcon = (weather: Weather) => {
  switch (weather.type) {
    case 'rain': {
      if (weather.is_happening) {
        return <Image source={rainyIcon} className="w-7 h-7" />;
      } else {
        return <Image source={sunnyIcon} className="w-7 h-7" />;
      }
    }
    case 'cold': {
      if (weather.is_happening) {
        if (weather.intensity === 'intense' || weather.intensity === 'high') {
          return (
            <Image
              source={coldIcon}
              className="w-7 h-7"
              style={{ tintColor: 'white' }}
            />
          );
        } else {
          return (
            <Image
              source={windIcon}
              className="w-7 h-7"
              style={{ tintColor: 'white' }}
            />
          );
        }
      } else {
        // intense is too cold, none is too hot
        if (weather.intensity === 'none' || weather.intensity === 'low') {
          return (
            <Image
              source={heatIcon}
              className="w-7 h-7"
              style={{ tintColor: 'white' }}
            />
          );
        } else {
          return (
            <Image
              source={leafIcon}
              className="w-7 h-7"
              style={{ tintColor: 'white' }}
            />
          );
        }
      }
    }
    case 'uv': {
      if (weather.intensity === 'none' || weather.intensity === 'low') {
        return (
          <Image
            source={shieldIcon}
            className="w-7 h-7"
            style={{ tintColor: 'white' }}
          />
        );
      }
      if (weather.intensity === 'normal') {
        return (
          <Image
            source={halfSunIcon}
            className="w-7 h-7"
            style={{ tintColor: 'white' }}
          />
        );
      }
      if (weather.intensity === 'high') {
        return (
          <Image
            source={shieldIcon}
            className="w-7 h-7"
            style={{ tintColor: 'white' }}
          />
        );
      }
      if (weather.intensity === 'intense') {
        return (
          <Image
            source={deadIcon}
            className="w-7 h-7"
            style={{ tintColor: 'white' }}
          />
        );
      }
      break;
    }
    default: {
      return undefined;
    }
  }
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
      let msgs: Message[] = [];
      res.forEach(it => {
        msgs.push({
          message: it.message,
          icon: getWeatherIcon(it),
        });
      });
      setMessages(msgs);
    } catch (err) {
      setMessages([DEFAULT_ERROR_MESSAGE]);
    }
    setLoading(false);
  }, []);

  const syncDeviceToken = useCallback(
    async (token: string, pos: GeoPosition) => {
      const date = dayjs().tz(getTimeZone()).format();
      await DeviceService.sync({
        location: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
        token: token,
        time: date,
      }); // Sync Device Token when location is found
    },
    [],
  );

  useEffect(() => {
    if (position) {
      getCurrentWeather(position);
      messaging()
        .getToken()
        .then(token => syncDeviceToken(token, position));
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

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      if (position) {
        syncDeviceToken(token, position);
      }
    });
  }, [getCurrentWeather, syncDeviceToken, position]);

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
