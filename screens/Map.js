import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { getFountains } from '../utils/Fountains';

const MapScreen = ({ navigation }) => {
 
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.12,
        longitudeDelta: 0.06,
      });
    };
    getLocation();
  }, []);

  const markers = getFountains();

  
  const handleBackNavigation = () => {
    // Request location permission once the map mounts
    navigation.navigate('Login');
  }

  const handleRatingsNavigation = () => {
    navigation.navigate('Ratings');
  }

  return (
    <View style={styles.container}>
      <View >
        <TouchableOpacity onPress={handleBackNavigation}>
          <Text style={styles.backButton}>&lt; Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.map}>
        <MapView
          region={initialLocation}
          showsUserLocation={true}
          style={{width: '100%', height: '100%'}}
        >
          {currentLocation && (
            markers.map((marker)=> {
              return (
                <Marker
                coordinate={{
                  latitude: marker.latitude + 0.02,
                  longitude: marker.longitude + 0.01,
                }}
                title="Your Location"
                onPress={handleRatingsNavigation}
                />
              )
            })
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingTop:"10%",
    paddingLeft: '5%',
    fontSize: 18,
    color: 'grey'
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative', 
    paddingTop: "2%",
    top: '0%',
  },
});

export default MapScreen;

