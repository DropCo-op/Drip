import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export default class RatingClicks extends Component {
  name;
  parentHandler;

  constructor(props) {
    super(props);
    this.name = props.name;
    this.state = { rating: props.rating };
    this.parentHandler = props.parentHandler;
    this.changed = false; 
  }

  handleRateClick = (rating) => {
    this.setState({ rating });
    this.parentHandler(rating);
    this.changed = true; 
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
            key={i}
            source={
              i <= rating
                ? (this.changed? require("../assets/logo.png"):require("../assets/selected.png"))
                : require("../assets/unselected.png")
            }
          />
        </TouchableOpacity>
      );
    }

    return drops;
  }

  render() {
    return (
      <View style={{ flexDirection: "column", flex: 2, width: "100%" }}>
        <View style={styles.rate_title_container}>
          <Text style={styles.rate_title}>{this.name}</Text>
          <Text style={[styles.rate_title, { textAlign: "right" }]}>
            Rating: {this.state.rating}/5
          </Text>
        </View>
        <View style={styles.container}>{this.renderRates()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: "7%",
    flex: 1,
    borderColor: "#00C2FF",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#EEE",
  },
  droplets: {
    padding: 5,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  rate_image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  rate_title_container: {
    flex: 1,
    flexDirection: "row",
  },
  rate_title: {
    flex: 1,
    fontSize: 20,
    color: "black",
  },
});

RatingClicks.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  parentHandler: PropTypes.func.isRequired,
};
