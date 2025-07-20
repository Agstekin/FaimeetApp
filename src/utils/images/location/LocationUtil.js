// src/utils/locationUtil.js
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

/**
 * Requests Android location permission.
 * @returns {Promise<boolean>}
 */
export async function requestLocationPermission() {
  if (Platform.OS !== 'android') return true;

  const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const granted = await PermissionsAndroid.request(fine, {
    title: 'Location Permission',
    message: 'We need your location to show it in the header.',
    buttonPositive: 'OK',
    buttonNegative: 'Cancel',
  });
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

/**
 * Gets current location if permission granted.
 * @returns {Promise<{ latitude: number, longitude: number }|null>}
 */
export async function getCurrentLocation() {
  const ok = await requestLocationPermission();
  if (!ok) return null;

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}
