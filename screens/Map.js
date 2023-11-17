import { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PropTypes from "prop-types";
import { s3 } from "../utils/S3Storage";
import { saveAuthenticationStatus } from '../utils/LocalAuth';
import { getFountains } from "../utils/DDBStorage";

const MapScreen = ({ navigation }) => {
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

      const romeCoords = {
        longitude: 12.4964,
        latitude: 41.9028,
      };

      setInitialLocation({
        latitude:( Math.abs((location.coords.latitude + romeCoords.latitude)/2))<20?(location.coords.latitude + romeCoords.latitude)/2: romeCoords.latitude,
        longitude: ( Math.abs((location.coords.longitude + romeCoords.longitude)/2))<20?(location.coords.longitude+ romeCoords.longitude)/2: romeCoords.longitude,
        
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
    };
    getLocation();
  }, []);

  const getParams = {
    Bucket: "drip-fountains-eu",
    Key: "fountains3.json",
  };

  s3.getObject(getParams, (err, data) => {
    if (err) {
      console.error("Error retrieving JSON file from S3", err);
    } else {
      setCoordinatesList(JSON.parse(data.Body.toString())["fountains"]);
    }
  });

  const handleBackNavigation = () => {
    // Request location permission once the map mounts
    saveAuthenticationStatus(false);
    navigation.navigate("Login");
  };

  const handleRatingsNavigation = (marker, list) => {
    navigation.navigate("Ratings", {Marker: marker, List: list});
  };

  const handleNewFountainNavigation = (list) => {
    navigation.navigate("InputMap", list);
  }

  const handleDrag = (region) => {
  //  console.log(`latitude is ${region.latitude}`);
  //  console.log(`longitude is ${region.longitude}`)
  //  console.log(mapRef.current.props.region)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackNavigation}>
          <Text style={styles.buttonText}>&lt; Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newFountainButton} onPress={()=> handleNewFountainNavigation(coordinatesList)}>
          <Text style={styles.buttonText}> + New Fountain</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          region={initialLocation}
          showsUserLocation={true}
          followsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
          onRegionChangeComplete={handleDrag}
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
                  handleRatingsNavigation(marker, coordinatesList);
                }}
              />
            );
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00C2FF"
  },
  headerBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    // // alignContent: "flex-end", 
    // height: "7%",
    // color: "purple",
  },
  backButton: {
    marginHorizontal: "5%",
    marginVertical: "1%"
  },
  newFountainButton: {
    marginHorizontal: "5%",
    marginVertical: "1%"
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF"
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
