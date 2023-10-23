import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import {s3} from '../App';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("logging in...");
    s3.getObject({Bucket: 'drip-users-eu', Key: username.concat('.json')}, (err, data) => {
      if (err) {
        console.log('Error retrieving JSON file from S3', err);
      } else {
        console.log("user found!");
        console.log(JSON.parse(data.Body.toString()));
        navigation.navigate('Map');
      }
    });
  };

  const handleCreateAccount = () => {
    // navigation.navigate('Login');
    console.log("Create account");
    navigation.navigate('CreateAccount');
  };

  const handleForgotPassword = () => {
    // navigation.navigate('Login');
    console.log("Forgot Password");
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleBox}>
        <Image
          style={styles.title}
          source={require("../assets/title.png")}
        />
      </View>

      {/* username */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      {/* password */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Password</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      {/* create account, forgot password */}
      <View style = {styles.linkBox}>
        <TouchableOpacity style={styles.link} onPress={handleCreateAccount}>
          <Text style={[styles.link, {textAlign: "left"}]}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={handleForgotPassword}>
          <Text style={[styles.link, {textAlign: "right"}]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "#00C2FF"
  },
  titleBox: {
    flex: 10,
    width: "70%",
  },
  title: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  inputLabelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "left"
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
    color: "#FFFFFF",
    fontSize: 16
  },
  linkBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "left",
    width: "80%"
  },
  link: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    textDecorationLine: 'underline'
  },
  button: {
    flex: 2,
    marginTop: "20%"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24 
  },
  bottomSpace: {
    flex: 5
  }
});

export default LoginScreen;

