import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BackBtn from "../utils/BackBtn";
import RatingMetric from "../utils/RatingMetric";
import { uploadObjectToS3 } from "../utils/S3Storage";

const InputFountain = ({ navigation }) => {
  console.log("in ratings...");

  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [taste, setTaste] = useState(0);
  const [busyness, setBusyness] = useState(0);
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);

  useEffect(() => {
    console.log("hi \n\n\n");
  }, []); // The empty dependency array [] means it runs only once on mount

  const handleBack = () => {
    navigation.navigate("Map");
  };

  const handleInfo = () => {
    navigation.navigate("InputMore");
  };

  const handleTemperature = (selectedRating) => {
    setTemperature(selectedRating);
  };

  const handlePressure = (selectedRating) => {
    setPressure(selectedRating);
  };

  const handleTaste = (selectedRating) => {
    setTaste(selectedRating);
  };

  const handleBusyness = (selectedRating) => {
    setBusyness(selectedRating);
  };

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />

      {/* title */}
      <TextInput
        style={styles.title}
        onChangeText={(text) => setName(text)}
        placeholder={"Enter Name"}
      />

      {/* temperature */}
      <RatingMetric
        name="Temperature"
        start="Hot"
        end="Cold"
        rating={0}
        handler={handleTemperature}
      />

      {/* pressure */}
      <RatingMetric
        name="Pressure"
        start="Weak"
        end="Strong"
        rating={0}
        handler={handlePressure}
      />
      {/* busyness */}
      <RatingMetric
        name="Busyness"
        start="Crowded"
        end="Empty"
        rating={0}
        handler={handleBusyness}
      />
      {/* taste */}
      <RatingMetric
        name="Taste"
        start="Gross"
        end="Quality"
        rating={0}
        handler={handleTaste}
      />
      <View style={{ marginBottom: "0%" }}></View>

      {/* info button */}
      <TouchableOpacity style={styles.button} onPress={handleInfo}>
        <Text style={styles.button_text}>Next</Text>
      </TouchableOpacity>

      <View style={styles.bottom_space} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  title: {
    flex: 0.5,
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00C2FF",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 36,
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    marginBottom: "5%",
    marginTop: "5%",
  },
  button: {
    flex: 0.5,
    justifyContent: "center",
    borderColor: "#00C2FF",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#00C2FF",
    width: "25%"
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 24,
    alignSelf: "center",
  },
  bottom_space: {
    marginTop: "10%",
  },
  back_button: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "#00C2FF",
    alignSelf: "flex-start",
    padding: 1,
  },
});

InputFountain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InputFountain;
