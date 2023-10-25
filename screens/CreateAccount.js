import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import {s3} from '../S3Storage.js';
import { uploadObjectToS3 } from '../S3Storage.js';
import sha256 from 'js-sha256';



// check if email is valid
function emailCheck(emailInput){
	const validEnds = ['com', 'net', 'org', 'edu'];
	const emailSplit = emailInput.split('@');

	// check for only one '@'
	if (emailSplit.length !== 2) {
   		return false; 
  	}

	const [eBeg, eEnd] = emailSplit;
	const eEnds = eEnd.split('.');
	const realEnd =  eEnds[eEnds.length - 1].toLowerCase();

	if (
		eBeg.match(/^[A-Z0-9._%+-]+$/i) && // check start
    		validEnds.includes(realEnd) // check valid ends
	){
    		return true;
  	}

  	return false;
}	


// create new user
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

	var proceed = true;

	// check that all spaces have something entered
	if (myEmail.length == 0){
		proceed = false;
		console.log('Email not entered');
		setErrorMessage("Please enter an email.");
	}

	if (myUsername.length == 0){
		proceed = false;
		console.log('Username not entered');
		setErrorMessage("Please enter a username.");
	}

	if (myPassword.length == 0){
		proceed = false;
		console.log('Password not entered');
		setErrorMessage("Please enter a password");
	}

	if (myConfirmPassword.length == 0){
		proceed = false;
		console.log('Confirm Password not entered');
		setErrorMessage("Please confirm your password.");
	}

	// check if email is valid
	if (emailCheck(myEmail) == false){
		proceed = false;
		console.log('Invalid email');
		setErrorMessage("Invalid email. Please try again.");
	}

	// check if username is between 6 and 32 chars
	

	// check if any other users have that username
	

	// check if passwords match
	if (myPassword != myConfirmPassword){
		proceed = false;
		console.log('Passwords do not match');
		setErrorMessage("Passwords do not match; Please try again.");
	}


    if (proceed == true){
	const userHash = myUsername + ".json";	
	const passHash = sha256(myPassword);
	const newUser = new User(myUsername, myEmail, passHash);

	uploadObjectToS3('drip-users-eu', userHash, newUser);
	navigation.navigate('Map');
    } else {
	console.log('Error creating account');
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
	autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}

        onChangeText={(text) => setMyEmail(text)}
        value={myEmail}
      />
     
      {/* username */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
	autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}

        onChangeText={(text) => setMyUsername(text)}
        value={myUsername}
      />

      {/* password */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Password</Text>
      </View>
      <TextInput
        style={styles.input}
	secureTextEntry={true}
	autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}

        onChangeText={(text) => setMyPassword(text)}
        value={myPassword}
      />

      {/* confirm password */}
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Confirm Password*</Text>
      </View>
      <TextInput
        style={styles.input}
	secureTextEntry={true}
	autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}

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


