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
        {/* <View style={styles.rate_title_container}>
          <Text style={styles.rate_title}>{this.name}</Text>
          <Text style={[styles.rate_title, {textAlign: 'right'}]}>Rating: 0/5</Text>
        </View> */}

        <RatingClicks handleRate={this.handler} name={this.name}/>

        <View style={{ flexDirection: "row", flex: 1,}}>
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
    // borderColor: 'yellow',
    // borderWidth: 1,
  },
  rate_title_container: {
    flex: 1,
    flexDirection: 'row',
  },
  rate_title: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  rate_label: {
    fontSize: 28,
    color: "white",
  },
  rate_option: {
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
  rate_row: {
    flex: 2,
    padding: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    borderColor: "white",
    borderWidth: 2,
    columnGap: 5,
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
