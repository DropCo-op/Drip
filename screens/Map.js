import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { getFountains } from '../utils/Fountains';
import {s3} from '../App';

const MapScreen = ({ navigation }) => {
 
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [coordinatesList, setMarkers] = useState(null);

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

  const getParams = {
    Bucket: 'drip-fountains-eu',
    Key: 'fountains.json'
  }

  s3.getObject(getParams, (err, data) => {
    if (err) {
      console.error('Error retrieving JSON file from S3', err);
    } else {
      setMarkers(JSON.parse(data.Body.toString())["fountains"]);
      // Now you have your coordinatesList, which should be an array of coordinates.
      // Proceed to rendering markers using React Native Maps.
    }
  });

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
          {coordinatesList && (
            coordinatesList.map(
              (marker)=> {
              return (
                <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
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


