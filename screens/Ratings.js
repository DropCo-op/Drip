import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import BackBtn from "../utils/BackBtn";
import RatingMetric from "../utils/RatingMetric";
import RatingClicks from "../utils/RatingClicks";

const SubmitRatingsScreen = ({ navigation }) => {
  state = { rating: 0 };

  const handleBack = () => {
    navigation.navigate("Map");
  };

  const handleSubmit = () => {
    // TODO: gray out the "submit" button, stays on the fountain page
    // TEMPORARY: goes to Login for now, but will need to change
    navigation.navigate("Login");
  };

  const handleNav = () => {
    navigation.navigate("Map");
  };

  const handleInfo = () => {
    // TEMPORARY: set to "info" screen when available
    navigation.navigate("CreateAccount");
  };

  const handleRate = (selectedRating) => {
    this.setRatings({ selectedRating });
  };

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />
      
      {/* title */}
      <View style={styles.title_box}>
        <Text style={styles.title}>Fountain (name)</Text>
      </View>

      <View style={styles.fountain_image}>
        {/* TODO: add image */}
        <Image
          style={{
            height: "80%",
            width: "80%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={require("../assets/logo.png")}
        />
        <Text style={{ color: "white", alignSelf: "center" }}>
          [Temporary Image]
        </Text>
      </View>

      {/* container for three buttons */}
      <View style={styles.button_container}>
        {/* submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>

        {/* navigate button */}
        <TouchableOpacity style={styles.button} onPress={handleNav}>
          <Text style={styles.button_text}>Navigate</Text>
        </TouchableOpacity>

        {/* info button */}
        <TouchableOpacity style={styles.button} onPress={handleInfo}>
          <Text style={styles.button_text}>More Info</Text>
        </TouchableOpacity>
      </View>

      {/* temperature */}
      <RatingMetric
        name="Temperature"
        start="Hot"
        end="Cold"
        handler={handleRate}
      />

      {/* pressure */}
      <RatingMetric
        name="Pressure"
        start="Weak"
        end="Strong"
        handler={handleRate}
      />
      {/* busyness */}
      <RatingMetric
        name="Busyness"
        start="Crowded"
        end="Empty"
        handler={handleRate}
      />
      {/* taste */}
      <RatingMetric
        name="Taste"
        start="Gross"
        end="Quality"
        handler={handleRate}
      />

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
    backgroundColor: "#00C2FF",
  },
  title_box: {
    flex: 0.5,
    width: "70%",
    height: "70%",
    paddingTop: "5%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 36,
    color: "white",
    height: "70%",
  },
  fountain_image: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    width: "75%",
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    columnGap: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
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
    color: "white",
    alignSelf: "flex-start",
    padding: 1,
  },
});

export default SubmitRatingsScreen;
