import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class BackBtn extends React.Component {
  handler;
  color;

  constructor(props) {
    super(props);
    this.handler = props.handler;
    this.color = props.color;
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handler}>
          <Text style={[{ color: this.color }, styles.backButton]}>
            &lt; Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
  }
});

BackBtn.propTypes = {
  handler: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
