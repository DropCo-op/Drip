import * as React from "react";
import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import { getLocation } from "../utils/Location.js";
import Message from "../utils/Message.js";
import ErrorMessage from "../utils/ErrorMessage.js";

const InputMapScreen = ({ navigation, route }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loc, setLoc] = useState(false);

  const mapRef = useRef(null);

  const [centerCoordinate, setCenterCoordinate] = useState(null);
  useEffect(() => {
    const initializeCenterCoordinate = async () => {
      try {
        const loc1 = await getLocation();
        setCenterCoordinate(loc1);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    initializeCenterCoordinate();
  }, []);

  const handleBackNavigation = () => {
    navigation.navigate("Map");
  };

  const handleDrag = (region) => {
    if (centerCoordinate) {
      setCenterCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  const handleNext = () => {
    if (loc) {
      navigation.navigate("InputFountain", {
        List: route.params,
        Latitude: centerCoordinate.latitude,
        Longitude: centerCoordinate.longitude,
      });
    } else {
      setErrorMessage("Please set fountain location.");

      if (!showErrorMessage) {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2200);
      }
    }
  };

  const handleSetLoc = (region) => {
    setLoc(true);

    setMessage("Location set!");

    if (!showMessage) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2200);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* back button */}
        <TouchableOpacity onPress={handleBackNavigation}>
          <Text style={styles.backButton}>&lt; Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.map}>
        <MapView
          ref={mapRef}
          region={centerCoordinate}
          showsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
          onRegionChangeComplete={handleDrag}
        >
          <Marker
            coordinate={centerCoordinate}
            title="Fountain"
            description="Input fountain marker"
            style={{ opacity: 0 }}
          >
            <Image style={{ opacity: 0 }} />
          </Marker>
        </MapView>
        <Image
          source={require("../assets/droplet.png")}
          style={styles.markerImage}
        />
      </View>

      <View style={styles.button_container_loc}>
        {/* set location button */}
        <TouchableOpacity style={styles.button} onPress={handleSetLoc}>
          <Text style={styles.button_text}>Set Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button_container_next}>
        {/* next page button */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.button_text}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* error */}
      <ErrorMessage
        errorMessage={errorMessage}
        showErrorMessage={showErrorMessage}
      />

      {/* loc message */}
      <Message message={message} showMessage={showMessage} />
    </SafeAreaView>
  );
};

InputMapScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.array.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button_container_loc: {
    position: "absolute",
    bottom: "12.5%",
    paddingBottom: "5%",
    left: "5%",
    right: "5%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button_container_next: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    right: "5%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 18,
    alignSelf: "center",
  },
  backButton: {
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingBottom: "5%",
    fontSize: 18,
    color: "grey",
  },
  markerImage: {
    width: "7%",
    height: "7%",
    resizeMode: "contain",
    zIndex: 2,
    position: "absolute",
    top: "45%",
    marginHorizontal: "45%",
  },
});

export default InputMapScreen;
