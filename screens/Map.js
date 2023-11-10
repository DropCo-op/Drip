import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PropTypes from "prop-types";
import { s3 } from "../utils/S3Storage";
import { saveAuthenticationStatus } from '../utils/LocalAuth';

const MapScreen = ({ navigation }) => {
  const [initialLocation, setInitialLocation] = useState(null);
  const [coordinatesList, setCoordinatesList] = useState([]);
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

  const listParams = {
    Bucket: "drip-fountains-eu",
  };
  
  s3.listObjects(listParams, (listErr, listData) => {
    if (listErr) {
      console.error("Error listing objects in S3 bucket", listErr);
    } else {
      listData.Contents?.forEach((object) => {
        const getParams = {
          Bucket: listParams["Bucket"],
          Key: object.Key
        }
        if (getParams["Key"]!='fountains.json'){
          s3.getObject(getParams, (err, data) => {
            if (err) {
              console.error("Error retrieving JSON file from S3", err);
            } else {
              let fountain = JSON.parse(data.Body.toString());

              if(fountain in coordinatesList){
                
              }
              else{
                coordinatesList.push(fountain);
                console.log(coordinatesList);
              }
              
            }
        });
      }
      else{
        console.log("key was the fountains.json");
      }
      });
      
    }
  })
  

  const handleBackNavigation = () => {
    // Request location permission once the map mounts
    saveAuthenticationStatus(false);
    navigation.navigate("Login");
  };

  const handleRatingsNavigation = (marker) => {
    navigation.navigate("Ratings", marker);
    window.console.log(marker);
    window.console.log("this is the marker \n\n\n\n ");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBackNavigation}>
          <Text style={styles.backButton}>&lt; Sign Out</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleRatingsNavigation(coordinatesList[0])}>
          <Text style={styles.newFountain}>Report New Fountain</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          region={initialLocation}
          showsUserLocation={true}
          followsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
        >
          {coordinatesList.map((marker) => {
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
  newFountain: {
    paddingTop: "5%",
    paddingLeft: "50%",
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
