import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import BackBtn from "../utils/BackBtn";
import RatingMetric from "../utils/RatingMetric";
import RatingClicks from "../utils/RatingClicks";

const SubmitRatingsScreen = ({ navigation }) => {
  state = { rating: 0 };

  const handleLogin = () => {
    // Add your authentication logic here
    // You can use Firebase, Axios, or any other method to authenticate the user
    navigation.navigate("Map");
  };

  const handleRate = (selectedRating) => {
    this.setRatings({ selectedRating });
  };

  // renderRates(rateName, left, right) {
  //   const { rating } = this.state;
  //   const drops = [];

  //   for (let i = 1; i <= 5; i++) {
  //     drops.push(
  //       <TouchableOpacity
  //         key={i}
  //         style={[
  //           styles.droplets,
  //           i <= rating ? styles.selectedDroplets : null,
  //         ]}
  //         onPress={() => this.handleRateClick(i)}
  //       >
  //         <RatingMetric
  //           name={rateName}
  //           start={left}
  //           end={right}
  //           handler={handleRate}
  //         />
  //       </TouchableOpacity>
  //     );

  //     return drops;
  // }

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

      {/* submit btn */}
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
    flex: 5,
    width: "70%",
    paddingTop: "15%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 48,
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
    color: "white",
    alignSelf: "flex-start",
    padding: 1,
  },
});

export default SubmitRatingsScreen;
