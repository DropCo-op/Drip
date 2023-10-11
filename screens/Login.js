import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    // You can use Firebase, Axios, or any other method to authenticate the user
    navigation.navigate('Map');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Login');
  };

  const handleForgotPassword = () => {
    navigation.navigate('Login');
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

      {/* email */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Email</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
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

