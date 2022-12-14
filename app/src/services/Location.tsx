import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import appConfig from '../../app.json';

const checkLocationPermissions = async () => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');
    return status === 'granted' || status === 'restricted';
  } else {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
};

export async function requestLocationPermissions() {
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
      case 'restricted':
        return true;
      case 'denied':
        Alert.alert('Location permission denied');
        break;
      case 'disabled':
        Alert.alert(
          `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
          '',
          [
            { text: 'Go to Settings', onPress: openSetting },
            {
              text: "Don't Use Location",
              onPress: () => {
                return;
              },
            },
          ],
        );
        break;
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
        ToastAndroid.show('Location permission denied.', ToastAndroid.LONG);
        break;
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        ToastAndroid.show('Location permission revoked.', ToastAndroid.LONG);
        break;
      default:
        return false;
    }
  };

  if (Platform.OS === 'ios') {
    return await hasPermissionsIOS();
  } else {
    return await hasPermissionsAndroid();
  }
}

export function getCurrentLocation(
  setPosition: (
    result: Geolocation.GeoPosition | null,
    err?: Geolocation.GeoError,
  ) => void,
) {
  const onSuccess = (location: Geolocation.GeoPosition) =>
    setPosition(location);
  const onError = (error: Geolocation.GeoError) => setPosition(null, error);

  checkLocationPermissions().then(locationPermitted => {
    if (locationPermitted) {
      Geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
    } else {
      setPosition(null, {
        code: Geolocation.PositionError.PERMISSION_DENIED,
        message: 'Permission Denied',
      });
    }
  });
}
