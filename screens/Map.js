import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PropTypes from "prop-types";
import { s3 } from "../S3Storage";

const MapScreen = ({ navigation }) => {
  //const [currentLocation, setCurrentLocation] = useState(null);
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
      //setCurrentLocation(location.coords);

      const romeCoords = {
        longitude: 12.4964,
        latitude: 41.9028,
      };

      setInitialLocation({
        latitude: (location.coords.latitude + romeCoords.latitude)/2,
        longitude: (location.coords.latitude + romeCoords.longitude)/2,
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
          {coordinatesList?.map((marker) => {
            return (
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                key={marker.name}
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
};

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
