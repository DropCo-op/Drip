import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export default class RatingClicks extends React.Component {
  state = { rating: 0 };

  handleRateClick = (rating) => {
    this.setState({ rating });
  };

  renderRates() {
    const { rating } = this.state;
    const drops = [];

    for (let i = 1; i <= 5; i++) {
      drops.push(
        <TouchableOpacity
          key={i}
          style={styles.droplets}
          onPress={() => this.handleRateClick(i)}
        >
          <Image
            style={styles.rate_image}
            // source={require("../assets/unselected.png")}
            key={i}
            source={
              i <= rating
                ? require("../assets/selected.png")
                : require("../assets/unselected.png")
            }
          />
        </TouchableOpacity>
      );
    }

    return drops;
  }

  render() {
    return <View style={styles.container}>{this.renderRates()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: "7%",
    flex: 1,
    borderColor: "white",
    borderWidth: 2,
  },
  droplets: {
    padding: 5,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  ratingText: {
    marginLeft: 10,
  },
  rate_image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
});
