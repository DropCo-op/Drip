import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BackBtn from "../utils/BackBtn";

const InputMore = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("InputFountain");
  };

  const [spoutCount, setSpoutCount] = useState(0);
  const [adjustableValve, setAdjustableValve] = useState(false);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("input more info");
    // setSpoutCount(route.params["spoutCount"]);
    // setAdjustableValve(route.params["adjustableValve"]);
    // setNotes(route.params["notes"]);
    // setHistory(route.params["history"]);
    // setName(route.params["name"]);
  }, []); // The empty dependency array [] means it runs only once on mount

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />

      {/* title */}
      <View style={styles.title_box}>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={{ flex: 0.5, flexDirection: "row", marginTop: "5%" }}>
        <Text
          style={{
            color: "black",
            textAlign: "left",
            flex: 1,
            fontSize: 24,
            paddingLeft: "5%",
          }}
        >
          Spout Count:{" "}
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSpoutCount(text)}
            placeholder={"0"}
          />
        </Text>
        <Text
          style={{
            color: "black",
            textAlign: "right",
            flex: 1,
            fontSize: 24,
            paddingRight: "5%",
          }}
        >
          Adjustable? {adjustableValve ? "Yes" : "No"}
        </Text>
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "black" }}>Notes</Text>
        <Text style={styles.text_info}>{notes}</Text>
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "black" }}>History</Text>
        <Text style={styles.text_info}>{history}</Text>
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
    backgroundColor: "#FFF",
    // paddingLeft: "5%",
    // paddingRight: "5%",
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
    color: "black",
    height: "70%",
  },
  text_section: {
    flex: 3,
    flexDirection: "column",
    width: "100%",
    paddingTop: 0,
    marginTop: 0,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  text_info: {
    flexWrap: "wrap",
    flex: 5,
    color: "black", //"#00C2FF",
    borderColor: "#00C2FF",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 24,
    marginBottom: 20,
    padding: "2.5%",
  },
  back_button: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "#00C2FF",
    alignSelf: "flex-start",
    padding: 1,
  },
  input: {
    borderColor: "#00C2FF",
    borderWidth: 2,
  },
});

InputMore.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InputMore;