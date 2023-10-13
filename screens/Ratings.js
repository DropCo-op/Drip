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

  this.state = {
    index: 0,
    imgList: ["../assets/droplet.png", "..assets/icon.png"],
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 1,
          justifyContent: "flex-end",
          alignContent: "flex-end",
        }}
      >
        <BackBtn handler={handleLogin} color="white" />
      </View>
      {/* title */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Submit Ratings</Text>
      </View>

      {/* temperature */}
      <RatingMetric
        name="Temperature"
        start="Hot"
        end="cold"
        handler={handleLogin}
      />
      <RatingMetric
        name="Pressure"
        start="Weak"
        end="Strong"
        handler={handleLogin}
      />
      <RatingMetric
        name="Busyness"
        start="Crowded"
        end="Empty"
        handler={handleLogin}
      />
      <RatingMetric
        name="Taste"
        start="Gross"
        end="Quality"
        handler={handleLogin}
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
});

export default SubmitRatingsScreen;
