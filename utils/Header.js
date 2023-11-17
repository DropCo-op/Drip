import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  handler;

  constructor(props) {
    super(props);
    this.handler = props.handler;
  }

  render() {
    return (
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={this.handler}>
          <Text style={styles.backButtonText}>&lt; Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Header.propTypes = {
  handler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  headerBar: {
    display: "flex",
    backgroundColor: "#00C2FF",
    flexDirection: "row",
    alignItems: "left",
    marginTop: "5%"
  },
  backButton: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  backButtonText: {
   fontSize: 20,
   color: "#FFFFFF"
  },
});

