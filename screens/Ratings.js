import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import BackBtn from "../utils/BackBtn";
import RatingMetric from "../utils/RatingMetric";

const SubmitRatingsScreen = ({ navigation }) => {
  const [temperature, setEmail] = useState("");
  const [prsesure, setPassword] = useState("");
  const [busyness, setBusyness] = useState("");

  const handleLogin = () => {
    // Add your authentication logic here
    // You can use Firebase, Axios, or any other method to authenticate the user
    navigation.navigate("Map");
  };

  const handleRate = () => {
    
  }

  return (
    <View style={styles.container}>
      <BackBtn handler={handleLogin} style={styles.backButton} />
      {/* title */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Submit Ratings</Text>
      </View>

      {/* temperature */}
      <RatingMetric
        name="Temperature"
        start="Hot"
        end="cold"
        handler={handleRate}
      />
      <RatingMetric
        name="Pressure"
        start="Weak"
        end="Strong"
        handler={handleRate}
      />
      <RatingMetric
        name="Busyness"
        start="Crowded"
        end="Empty"
        handler={handleRate}
      />
      <RatingMetric
        name="Taste"
        start="Gross"
        end="Quality"
        handler={handleRate}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    flex: 3,
    width: "70%",
    paddingTop: "20%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 28,
    color: "white",
  },
  button: {
    flex: 2,
    marginTop: "20%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  bottomSpace: {
    flex: 5,
  },
  backButton: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: 'white',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 1
  }
});

export default SubmitRatingsScreen;
