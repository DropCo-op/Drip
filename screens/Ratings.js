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
      <BackBtn handler={handleBack} style={styles.backButton} />
      {/* title */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Fountain (name)</Text>
      </View>

      <View
        style={{ flex: 1, borderColor: "black", borderWidth: 2, width: "75%" }}
      >
        {/* TODO: add image */}
        <Image
          style={{
            height: '80%',
            width: '80%',
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
      <View style={styles.buttonContainer}>
        {/* submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* navigate button */}
        <TouchableOpacity style={styles.button} onPress={handleNav}>
          <Text style={styles.buttonText}>Navigate</Text>
        </TouchableOpacity>

        {/* info button */}
        <TouchableOpacity style={styles.button} onPress={handleInfo}>
          <Text style={styles.buttonText}>Info</Text>
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

      <View style={styles.bottomSpace} />
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
  titleBox: {
    flex: 1,
    width: "70%",
    paddingTop: "5%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 36,
    color: "white",
  },
  buttonContainer: {
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    alignSelf: "center",
  },
  bottomSpace: {
    marginTop: '10%',
  },
  backButton: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "white",
    alignSelf: "flex-start",
    padding: 1,
  },
});

export default SubmitRatingsScreen;
