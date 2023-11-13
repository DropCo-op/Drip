import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BackBtn from "../utils/BackBtn";

const InputMore = ({ navigation, route }) => {

  const [name, setName] = useState("")

  const handleBack = () => {
    navigation.navigate("InputFountain");
  };

  const handleSubmit = () => {
    // const allRatings = [...route.params["List"]];
    // const ratings = {...route.params["Marker"]};
    // ratings["temperature"] = temp;
    // ratings[]

    navigation.navigate("Map");
  }

  useEffect(() => {
    console.log("name: " + route.params["Name"]);
    console.log("input more info");
    setName(route.params["Name"]);
  }, []);

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />

      {/* title */}
      <View style={styles.title_box}>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={{ flex: 0.5, flexDirection: "row", marginTop: "5%" }}>
        <Text style={styles.spout_count_text}>Spout Count:</Text>
        <TextInput style={styles.spout_count_input} placeholder={"#"} />

        <Text style={styles.adjustable_valve_text}>Adjustable?</Text>
        <TextInput style={styles.adjustable_valve_input} placeholder={"Y/N"} />
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "black" }}>Notes</Text>
        <TextInput multiline={true} style={styles.text_info} placeholder={"Enter any extra notes or comments about the fountain here"} />
      </View>

      <View style={styles.text_section}>
        <Text style={{ flex: 1, fontSize: 24, color: "black" }}>History</Text>
        <TextInput multiline={true} style={styles.text_info} placeholder={"Enter history information here, if available"} />
      </View>

      {/* submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.button_text}>Submit</Text>
      </TouchableOpacity>
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
  spout_count_text: {
    color: "black",
    flex: 1,
    fontSize: 20,
    paddingLeft: "5%",
    textAlign: "left",
    alignSelf: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  spout_count_input: {
    color: "black",
    textAlign: "left",
    flex: 0.5,
    fontSize: 20,
    // paddingRight: "2.5%",
  },
  adjustable_valve_text: {
    color: "black",
    textAlign: "right",
    flex: 1,
    fontSize: 20,
    alignSelf: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  adjustable_valve_input: {
    color: "black",
    textAlign: "center",
    flex: 0.5,
    fontSize: 20,
    paddingRight: "5%",
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
    textAlignVertical: "top",
  },
  back_button: {
    paddingTop: "10%",
    paddingLeft: "5%",
    fontSize: 18,
    color: "#00C2FF",
    alignSelf: "flex-start",
    padding: 1,
  },
  button: {
    flex: 0.5,
    justifyContent: "center",
    borderColor: "#00C2FF",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: "5%",
    backgroundColor: "#00C2FF",
    width: "25%"
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 24,
    alignSelf: "center",
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
