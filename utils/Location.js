import * as Location from 'expo-location';

export const getLocation = async () => {
  let location = await Location.getLastKnownPositionAsync();

  const romeCoords = {
    longitude: 12.4964,
    latitude: 41.9028,
  };

  return {
    latitude:
      location.coords.latitude,
    longitude:
      location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
};
