import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Touchable,
} from "react-native";
import React, { useState } from "react";

const SubmitRatingsScreen = ({ navigation }) => {
  const [temperature, setEmail] = useState("");
  const [prsesure, setPassword] = useState("");
  const [busyness, setBusyness] = useState("");

  const handleLogin = () => {
    // Add your authentication logic here
    // You can use Firebase, Axios, or any other method to authenticate the user
    navigation.navigate("Map");
  };

  const handleRates = () => {
    if (this.state.index === 0) {
      this.setState({ index: 1 });
    } else {
      this.setState({ index: 0 });
    }
  };

  let [flag, setFlag] = React.useState(true);
  let toggleSwitch = () => setFlag((previousState) => !previousState);
  let pic = flag
    ? require("../assets/droplet.png")
    : require("../assets/icon.png");

  this.state = {
    index: 0,
    imgList: ["../assets/droplet.png", "..assets/icon.png"],
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleBox}>
        <Image style={styles.title} source={require("../assets/title.png")} />
      </View>
      
      {/* temperature */}
      <View style={styles.rate_container}>
        <View style={styles.rate_title_container}>
          <Text style={styles.rate_title}>Tempeature</Text>
        </View>

        <View style={styles.rate_row}>
          <TouchableOpacity
            style={styles.rate_option}
            onPress={() => toggleSwitch()}
          >
            <Image
              id="temp1"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={handleRates}>
            <Image
              id="temp2"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={handleRates}>
            <Image
              id="temp3"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={handleRates}>
            <Image
              id="temp4"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rate_option} onPress={handleRates}>
            <Image
              id="temp5"
              style={styles.rate_image}
              source={require("../assets/droplet.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: "black", flex: 1}}>
          <View style={styles.rate_scale_left}>
            <Text style={styles.rate_scale_text}>Hot</Text>
          </View>
          <View style={styles.rate_scale_right}>
            <Text style={styles.rate_scale_text}>Cold</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpace} />
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
  },
  titleBox: {
    flex: 10,
    width: "70%",
  },
  title: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    fontSize: 28
  },
  inputLabelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "left",
  },
  inputLabel: {
    flex: 1,
    marginLeft: "10%",
    color: "#FFFFFF",
    fontSize: 24,
  },
  input: {
    flex: 1,
    width: "80%",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: "5%",
  },
  rate_container: {
    flexDirection: 'column',
    width: '90%',
    flex: 1
  },
  rate_title_container: {
    flex: 5
  },
  rate_title: {
    flex: 1,
    fontSize: 28,
    color: 'white'
  },
  rate_label: {
    fontSize: 28,
    color: "white",
  },
  rate_option: {
    padding: 5,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  rate_image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  rate_row: {
    flex: 2,
    padding: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    resizeMode: "contain",
    columnGap: 5,
  },
  rate_scale_left: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rate_scale_right: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  rate_scale_text: {
    color: "white",
    fontSize: 20,
    paddingRight: 20,
  },
  button: {
    flex: 2,
    marginTop: "20%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  bottomSpace: {
    flex: 5,
  },
});

export default SubmitRatingsScreen;
