import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../utils/Header";
import { uploadObjectToS3 } from "../utils/S3Storage";
import ErrorMessage from "../utils/ErrorMessage";

const InputMore = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [taste, setTaste] = useState(0);
  const [busyness, setBusyness] = useState(0);
  const [adjustableValve, setAdjustableValve] = useState(false);
  const [spoutCount, setSpoutCount] = useState(1);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(route.params["Name"]);
    setLat(route.params["Latitude"]);
    setLong(route.params["Longitude"]);
    setTemperature(route.params["Temperature"]);
    setPressure(route.params["Pressure"]);
    setBusyness(route.params["Busyness"]);
    setTaste(route.params["Taste"]);
  }, []);

  const handleBack = () => {
    navigation.navigate("InputFountain", {Latitude: route.params.Latitude, Longitude: route.params.Longitude, List: route.params.List});
  };

  const handleSubmit = () => {
    let allRatings = [...route.params["List"]];
    const ratings = {};
    ratings["name"] = name;
    ratings["latitude"] = lat;
    ratings["longitude"] = long;
    ratings["notes"] = notes;
    ratings["history"] = history;
    ratings["temperature"] = temperature;
    ratings["pressure"] = pressure;
    ratings["busyness"] = busyness;
    ratings["taste"] = taste;
    ratings["adjustableValve"] = adjustableValve;
    ratings["spoutCount"] = spoutCount;
    ratings["ratingCount"] = 1;

    if (!validateSpoutCount(spoutCount)) {
      setErrorMessage("Please input a number for Spout Count.");

      if (!showErrorMessage) {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2200);
      }
      console.log("invalid Spout Count input");
    } else if (!validateAdjustable(adjustableValve)) {
      setErrorMessage('Please input "Y" or "N" for Adjustable.');

      if (!showErrorMessage) {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2200);
      }
      console.log("invalid adjustable input");
    } else {
      allRatings.push(ratings);
      allRatings = { fountains: allRatings };

      uploadObjectToS3("drip-fountains-eu", "fountains3.json", allRatings);

      navigation.navigate("Map");
    }
  };

  const onChangeAdjustable = (input) => {
    const no = ["no", "No", "NO", "nO", "N", "n"];
    const yes = ["yes", "Yes", "YES", "yeS", "yES", "yEs", "Y", "y"];

    if (no.includes(input)) {
      setAdjustableValve(false);
    } else if (yes.includes(input)) {
      setAdjustableValve(true);
    } else {
      setAdjustableValve("fail");
    }
  };

  const validateSpoutCount = (input) => {
    return !isNaN(input);
  };

  const validateAdjustable = (input) => {
    return (typeof input == "boolean");
  };

  return (
    <SafeAreaView style={{backgroundColor: "#00C2FF", height: "100%"}}>

      <Header handler={handleBack} />

      <View style={styles.container}>

        {/* title */}
        <View style={styles.title_box}>
          <Text style={styles.title} testID="nameField">{name}</Text>
        </View>

        <View style={{ flex: 0.5, flexDirection: "row", marginTop: "5%" }}>
          <Text style={styles.spout_count_text}>Spout Count:</Text>
          <TextInput
            onChangeText={setSpoutCount}
            style={styles.spout_count_input}
            placeholder={"#"}
          />

          <Text style={styles.adjustable_valve_text}>Adjustable?</Text>
          <TextInput
            onChangeText={onChangeAdjustable}
            style={styles.adjustable_valve_input}
            placeholder={"Y/N"}
          />
        </View>

        <View style={styles.text_section}>
          <Text style={{ flex: 1, fontSize: 24, color: "black" }}>Notes</Text>
          <TextInput
            onChangeText={setNotes}
            multiline={true}
            style={styles.text_info}
            placeholder={
              "Enter any extra notes or comments about the fountain here"
            }
            testID="notesOrCommentsTextField"
          />
        </View>

        <View style={styles.text_section}>
          <Text style={{ flex: 1, fontSize: 24, color: "black" }}>History</Text>
          <TextInput
            onChangeText={setHistory}
            multiline={true}
            style={styles.text_info}
            placeholder={"Enter history information here, if available"}
            testID="HistoryTextInput"
          />
        </View>

        {/* submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} testID="submitButton">
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>

        {/* Error message display */}
        <ErrorMessage
          errorMessage={errorMessage}
          showErrorMessage={showErrorMessage}
        />
      </View>
    </SafeAreaView>
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
    width: "25%",
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
  route: PropTypes.shape({
    params: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Latitude: PropTypes.number.isRequired,
        Longitude: PropTypes.number.isRequired,
        Temperature: PropTypes.number.isRequired,
        Pressure: PropTypes.number.isRequired,
        Busyness: PropTypes.number.isRequired,
        Taste: PropTypes.number.isRequired,
        List: PropTypes.array.isRequired,
    }),
  })
};

export default InputMore;
