import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getFountains } from '../utils/Fountains';
import PropTypes from 'prop-types'; 
import {s3} from '../S3Storage';

const MapScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [coordinatesList, setCoordinatesList] = useState(null);
  const mapRef = useRef(null);

  

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      setCurrentLocation(location.coords);

      const romeCoords = {
        longitude: 12.4964,
        latitude: 41.9028,
      };

      setInitialLocation({
        latitude: romeCoords.latitude,
        longitude: romeCoords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
      window.console.log("location has been set");
    };
    getLocation();
  }, []);

  const getParams = {
    Bucket: "drip-fountains-eu",
    Key: "fountains.json",
  };

  s3.getObject(getParams, (err, data) => {
    if (err) {
      console.error("Error retrieving JSON file from S3", err);
    } else {
      setCoordinatesList(JSON.parse(data.Body.toString())["fountains"]);
      // Now you have your coordinatesList, which should be an array of coordinates.
      // Proceed to rendering markers using React Native Maps.
    }
  });

  const navigateToTarget = () => {
    try {
      window.console.log("triggered");
      const currentLocation = {
        latitude: 99.9,
        longitude: 99.9,
      };
      const targetCoordinate = {
        latitude: 99.99,
        longitude: 99.99,
      };
      // Calculate the region to focus on both the user and target coordinate.
      const region = {
        latitude: (currentLocation.latitude + targetCoordinate.latitude) / 2,
        longitude: (currentLocation.longitude + targetCoordinate.longitude) / 2,
        latitudeDelta:
          Math.abs(currentLocation.latitude - targetCoordinate.latitude) * 1.5,
        longitudeDelta:
          Math.abs(currentLocation.longitude - targetCoordinate.longitude) *
          1.5,
      };
      window.console.log(currentLocation);

      // Set the calculated region to the MapView, which will animate to that region.
      mapRef.current.animateToRegion(region, 1000); // Adjust the duration as needed.
    } catch (error) {
      window.console.error("Error navigating to target:", error);
    }
  };

  const handleBackNavigation = () => {
    // Request location permission once the map mounts
    navigation.navigate("Login");
  };

  const handleRatingsNavigation = (marker) => {
    navigation.navigate("Ratings", marker);
    window.console.log(marker);
    window.console.log("this is the marker \n\n\n\n ");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleBackNavigation}>
          <Text style={styles.backButton}>&lt; Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          region={initialLocation}
          showsUserLocation={true}
          followsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
        >
          {coordinatesList &&
            coordinatesList.map((marker) => {
              return (
                <Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  onPress={() => {
                    window.console.log(marker);
                    handleRatingsNavigation(marker);
                  }}
                />
              );
            })}
        </MapView>
      </View>
    </View>
  );
};

MapScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
}

const styles = StyleSheet.create({
  backButton: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "grey",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingTop: "2%",
    top: "0%",
  },
});

export default MapScreen;
