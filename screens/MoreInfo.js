import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import BackBtn from "../utils/BackBtn";

const MoreInfo = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("Ratings");
  };

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />

      {/* title */}
      <View style={styles.title_box}>
        <Text style={styles.title}>Fountain (name)</Text>
      </View>

      <View style={styles.fountain_image}>
        {/* TODO: add image */}
        <Image
          style={{
            height: "80%",
            width: "80%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={require("../assets/logo.png")}
        />
        <Text style={{ color: "white", alignSelf: "center" }}>
          [Temporary Image]
        </Text>
      </View>

      <View style={{ flex: 0.5, flexDirection: "row", marginTop: "5%" }}>
        <Text
          style={{ color: "white", textAlign: "left", flex: 1, fontSize: 24 }}
        >
          Spout Count: 1
        </Text>
        <Text style={{ color: "white", textAlign: "right", flex: 1 }}>
          Adjustable Valve? No
        </Text>
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "white" }}>Notes</Text>
        <Text style={styles.text_info}>Not available</Text>
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "white" }}>History</Text>
        <Text style={styles.text_info}>Not available</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#00C2FF",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  title_box: {
    flex: 0.5,
    width: "70%",
    height: "70%",
    paddingTop: "5%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 36,
    color: "white",
    height: "70%",
  },
  fountain_image: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    width: "75%",
  },
  text_section: {
    flex: 3,
    flexDirection: "column",
    width: "100%",
  },
  text_info: {
    flexWrap: "wrap",
    flex: 5,
    color: "white",
    borderColor: "white",
    borderWidth: 2,
  },
  back_button: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "white",
    alignSelf: "flex-start",
    padding: 1,
  },
});

export default MoreInfo;
