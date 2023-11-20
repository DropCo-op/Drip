import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../utils/Header";

const MoreInfo = ({ navigation, route }) => {
  const handleBack = () => {
    navigation.navigate("Ratings", route.params);
  };

  const [spoutCount, setSpoutCount] = useState(0);
  const [adjustableValve, setAdjustableValve] = useState(false);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setSpoutCount(route.params["Marker"]["spoutCount"]);
    setAdjustableValve(route.params["Marker"]["adjustableValve"]);
    setNotes(route.params["Marker"]["notes"]);
    setHistory(route.params["Marker"]["history"]);
    setName(route.params["Marker"]["name"]);
  }, []); // The empty dependency array [] means it runs only once on mount

  return (
    <SafeAreaView style={styles.backColor}>
      <Header handler={handleBack} />
      <View style={styles.container}>
        <View style={styles.fountain_image}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
              alignSelf: "center",
              // borderRadius: 15,
            }}
            source={require("../assets/nasoni.jpeg")}
          />
        </View>

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
            Spout Count: {spoutCount}
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
          <Text style={{ flex: 1, fontSize: 24, color: "#00C2FF" }}>Notes</Text>
          <Text style={styles.text_info}>{notes}</Text>
        </View>

        <View style={styles.text_section}>
          <Text style={{ flex: 1, fontSize: 24, color: "#00C2FF" }}>
            History
          </Text>
          <Text style={styles.text_info}>{history}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backColor: {
    backgroundColor: "#00C2FF",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
  fountain_image: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 2,
    // borderRadius: 15,
    width: "100%",
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
});

MoreInfo.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      Marker: PropTypes.shape({
        name: PropTypes.string.isRequired,
        temperature: PropTypes.number.isRequired,
        pressure: PropTypes.number.isRequired,
        taste: PropTypes.number.isRequired,
        busyness: PropTypes.number.isRequired,
        spoutCount: PropTypes.number.isRequired,
        history: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
        adjustableValve: PropTypes.bool.isRequired,
      }),
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MoreInfo;
