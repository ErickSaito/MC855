import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';

import appConfig from '../../app.json';

export async function useGeolocationPermissions() {

  const hasPermissionsIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    switch (status) {
      case 'granted':
        return true;
      case 'denied':
        Alert.alert('Location permission denied');
      case 'disabled':
        Alert.alert(
          `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
          '',
          [
            { text: 'Go to Settings', onPress: openSetting },
            { text: "Don't Use Location", onPress: () => { } },
          ],
        );
      default:
        return false;
    }
  };

  const hasPermissionsAndroid = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    switch (status) {
      case PermissionsAndroid.RESULTS.GRANTED:
        return true;
      case PermissionsAndroid.RESULTS.DENIED:
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      default:
        return false;
    }
  }

  if (Platform.OS === 'ios') {
    return await hasPermissionsIOS();
  } else {
    return await hasPermissionsAndroid();
  }
} 