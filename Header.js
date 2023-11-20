import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={{ flexDirection: "row", margin: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header;
