import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import {s3} from '../App';
import { uploadObjectToS3 } from '../S3Storage.js';

function User(username, email, password) {
  this.username = String(username);
  this.email = String(email);
  this.password = String(password);
}

const CreateAccountScreen = ({ navigation }) => {
  const [myEmail, setMyEmail] = useState('');
  const [myUsername, setMyUsername] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const [myConfirmPassword, setMyConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleCreateAccount = () => {

    if (myPassword == myConfirmPassword){
	const userHash = myUsername + ".json";
	const newUser = new User(myUsername, myEmail, myPassword);

	uploadObjectToS3(s3, 'drip-users-eu', userHash, newUser);
	navigation.navigate('Map');
    } else {
	console.log('Passwords do not match');
	setErrorMessage("Passwords do not match; Please try again.");
    }
  };


  const handleBack = () => {
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
        onChangeText={(text) => setMyEmail(text)}
        value={myEmail}
      />
     
      {/* username */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMyUsername(text)}
        value={myUsername}
      />

      {/* password */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Password</Text>
      </View>
      <TextInput
        style={styles.input}

        onChangeText={(text) => setMyPassword(text)}
        value={myPassword}
      />

      {/* confirm password */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Confirm Password*</Text>
      </View>
      <TextInput
        style={styles.input}

        onChangeText={(text) => setMyConfirmPassword(text)}
        value={myConfirmPassword}

      />

      {/* back to login */}
      <View style = {styles.linkBox}>
        <TouchableOpacity style={styles.link} onPress={handleBack}>
          <Text style={[styles.link, {textAlign: "left"}]}>&lt; Back to Login</Text>
        </TouchableOpacity>
      </View>

      {/* create account */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpace} />
   

      {/* Error message display */}
      {errorMessage && (
         <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{errorMessage}</Text>
      )}
      <View style={styles.errorSpace} />

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
    color: "#FFFFFF",
    fontSize: 16
  },
  linkBox: {
    position: 'absolute',
    top: '5%',
    flex: 1,
    flexDirection: "row",
    alignItems: "left",
    width: "80%"
  },
  link: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  button: {
    flex: 2,
    marginTop: "10%"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24 
  },
  bottomSpace: {
    marginBottom: '5%'
  },
  errorSpace: {
    marginBottom: '5%'
  }
});


export default CreateAccountScreen;


