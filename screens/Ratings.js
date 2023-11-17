import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BackBtn from "../utils/BackBtn";
import RatingMetric from "../utils/RatingMetric";
import { uploadObjectToS3 } from "../utils/S3Storage";
// import { Linking } from "react-native-linking";

const SubmitRatingsScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [taste, setTaste] = useState(0);
  const [busyness, setBusyness] = useState(0);

  useEffect(() => {
    setName(route.params["Marker"]["name"]);
    setTemperature(route.params["Marker"]["temperature"]);
    setPressure(route.params["Marker"]["pressure"]);
    setTaste(route.params["Marker"]["taste"]);
    setBusyness(route.params["Marker"]["busyness"]);
  }, []); // The empty dependency array [] means it runs only once on mount

  const handleBack = () => {
    navigation.navigate("Map");
  };

  const handleSubmit = () => {
    // add: gray out the "submit" button, stays on the fountain page
    var allRatings = [...route.params.List].filter((fountain) => {return fountain["name"] != route.params["Marker"]["name"]})
    const ratings = {...route.params.Marker};
    ratings["ratingCount"]++; 
    ratings["temperature"] = (temperature + (route.params.Marker.temperature * route.params.Marker.ratingCount))/ratings.ratingCount;
    ratings["pressure"] = (pressure + (route.params.Marker.pressure * route.params.Marker.ratingCount))/ratings.ratingCount
    ratings["taste"] = (taste + (route.params.Marker.taste * route.params.Marker.ratingCount))/ratings.ratingCount;
    ratings["busyness"] = (busyness + (route.params.Marker.busyness * route.params.Marker.ratingCount))/ratings.ratingCount;

    allRatings.push(ratings);

    allRatings = {"fountains": allRatings};

    uploadObjectToS3("drip-fountains-eu", "fountains3.json", allRatings);
  };

  const handleNav = () => {
    // navigation.navigate("Map");
    const lat = route.params["Marker"]["latitude"];
    const long = route.params["Marker"]["longitude"];
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;

    Linking.openURL(url).catch((err) =>
      console.error("Error Opening Google Maps:", err)
    );
  };

  const handleInfo = () => {
    navigation.navigate("MoreInfo", {Marker: route.params["Marker"], List: route.params["List"]});
  };

  const handleInput = () => {
    navigation.navigate("InputFountain");
  }

  const handleTemperature = (selectedRating) => {
    setTemperature(selectedRating);
  };

  const handlePressure = (selectedRating) => {
    setPressure(selectedRating);
  };

  const handleTaste = (selectedRating) => {
    setTaste(selectedRating);
  };

  const handleBusyness = (selectedRating) => {
    setBusyness(selectedRating);
  };

  return (
    <View style={styles.container}>
      <BackBtn handler={handleBack} style={styles.back_button} />

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

      {/* temperature */}
      <RatingMetric
        name="Temperature"
        start="Hot"
        end="Cold"
        rating={Math.round(route.params["Marker"]["temperature"])}
        handler={handleTemperature}
      />

      {/* pressure */}
      <RatingMetric
        name="Pressure"
        start="Weak"
        end="Strong"
        rating={Math.round(route.params["Marker"]["pressure"])}
        handler={handlePressure}
      />
      {/* busyness */}
      <RatingMetric
        name="Busyness"
        start="Crowded"
        end="Empty"
        rating={Math.round(route.params["Marker"]["busyness"])}
        handler={handleBusyness}
      />
      {/* taste */}
      <RatingMetric
        name="Taste"
        start="Gross"
        end="Quality"
        rating={Math.round(route.params["Marker"]["taste"])}
        handler={handleTaste}
      />
      <View style={{ marginBottom: "0%" }}></View>

      {/* container for three buttons */}
      <View style={styles.button_container}>
        {/* navigate button */}
        <TouchableOpacity style={styles.button} onPress={handleNav}>
          <Text style={styles.button_text}>Navigate</Text>
        </TouchableOpacity>

        {/* info button */}
        <TouchableOpacity style={styles.button} onPress={handleInfo}>
          <Text style={styles.button_text}>More Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button_container}>
        {/* submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom_space} />
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
    color: "black", //"#00C2FF",
    height: "70%",
  },
  fountain_image: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 2,
    // borderRadius: 15,
    width: "100%",
  },
  button_container: {
    // borderColor: "black",
    // borderWidth: 2,
    flex: 0.5,
    flexDirection: "row",
    width: "90%",
    columnGap: 15,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#00C2FF",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#00C2FF",
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 24,
    alignSelf: "center",
  },
  bottom_space: {
    marginTop: "10%",
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

SubmitRatingsScreen.propTypes = {
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
      List: PropTypes.array.isRequired,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SubmitRatingsScreen;
