import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import RatingClicks from "../utils/RatingClicks";

export default class RatingMetric extends React.Component {
  name;
  start;
  end;
  handler;

  constructor(props) {
    super(props);
    this.name = props.name;
    this.start = props.start;
    this.end = props.end;
    this.handler = props.handler;
  }

  render() {
    return (
      <View style={styles.rate_container}>
        {/* title and 5-droplet rating system */}
        <RatingClicks handleRate={this.handler} name={this.name} />

        {/* scale description (ex: hot-cold) */}
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.rate_scale_left}>
            <Text style={styles.rate_scale_text}>{this.start}</Text>
          </View>

          <View style={styles.rate_scale_right}>
            <Text style={styles.rate_scale_text}>{this.end}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rate_container: {
    flexDirection: "column",
    flex: 1,
    marginBottom: "1.5%",
  },
  rate_scale_left: {
    flex: 1,
    alignItems: "flex-start",
  },
  rate_scale_right: {
    flex: 1,
    alignItems: "flex-end",
  },
  rate_scale_text: {
    color: "white",
    fontSize: 20,
  },
});

RatingMetric.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
