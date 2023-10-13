import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

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
        <View style={styles.rate_title_container}>
          <Text style={styles.rate_title}>{this.name}</Text>
        </View>

        <View style={styles.rate_row}>
          <TouchableOpacity style={styles.rate_option} onPress={this.handler}>
            <Image
              id="temp1"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={this.handler}>
            <Image
              id="temp2"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={this.handler}>
            <Image
              id="temp3"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={this.handler}>
            <Image
              id="temp4"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={this.handler}>
            <Image
              id="temp5"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>
        </View>
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
    paddingTop: "0%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    fontSize: 28,
    color: "white",
  },
  rate_container: {
    flexDirection: "column",
    width: "75%",
    flex: 5,
  },
  rate_title_container: {
    flex: 1,
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
    borderColor: 'white',
    borderWidth: 2,
    columnGap: 5,
  },
  rate_scale_left: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rate_scale_right: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  rate_scale_text: {
    color: "white",
    fontSize: 20,
  }
});

RatingMetric.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
