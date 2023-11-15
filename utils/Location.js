import * as Location from 'expo-location';

export const getLocation = async () => {
  let location = await Location.getLastKnownPositionAsync();

  const romeCoords = {
    longitude: 12.4964,
    latitude: 41.9028,
  };

  return {
    latitude:
      Math.abs((location.coords.latitude + romeCoords.latitude) / 2) < 20
        ? (location.coords.latitude + romeCoords.latitude) / 2
        : romeCoords.latitude,
    longitude:
      Math.abs((location.coords.longitude + romeCoords.longitude) / 2) < 20
        ? (location.coords.longitude + romeCoords.longitude) / 2
        : romeCoords.longitude,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  };
};
