import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class BackBtn extends React.Component {
  handler;
  style;

  constructor(props) {
    super(props);
    this.handler = props.handler;
    this.style = props.style;
  }

  render() {
    return (
      <View style={{ alignSelf: "flex-start" }}>
        <TouchableOpacity onPress={this.handler}>
          <Text style={this.style}>&lt; Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

BackBtn.propTypes = {
  handler: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};
