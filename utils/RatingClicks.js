import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export default class RatingClicks extends Component {
  name;
  rating;
  parentHandler;

  constructor(props) {
    super(props);
    this.name = props.name;
    this.rating = props.rating;
    this.state = { rating: props.rating };
    this.parentHandler = props.parentHandler;
  }

  handleRateClick = (rating) => {
    this.setState({ rating });
    console.log("RatingClicks: " + rating);
    this.parentHandler(rating);
  };

  renderRates() {
    const { rating } = this.state;
    const drops = [];
    console.log(this.state);
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
    borderColor: "white",
    borderWidth: 1,
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
    color: "white",
  },
});

RatingClicks.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  parentHandler: PropTypes.func.isRequired,
};
