import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../utils/Header";
import { s3 } from "../utils/S3Storage";
import { uploadObjectToS3 } from "../utils/S3Storage.js";
import sha256 from "js-sha256";
import PropTypes from "prop-types";
import ErrorMessage from "../utils/ErrorMessage";

const userCheckCondition = true;

// check if email is valid
function emailCheck(emailInput) {
  const validEnds = ["com", "net", "org", "edu"];
  const emailSplit = emailInput.split("@");

  // check for only one '@'
  if (emailSplit.length !== 2) {
    return false;
  }

  const [eBeg, eEnd] = emailSplit;
  const eEnds = eEnd.split(".");
  const realEnd = eEnds[eEnds.length - 1].toLowerCase();

  return (
    eBeg.match(/^[A-Z0-9._%+-]+$/i) && // check start
    validEnds.includes(realEnd) // check valid ends
  );
}

function userCheck(userInput, callback) {
  s3.getObject(
    { Bucket: "drip-users-eu", Key: userInput.concat(".json") },
    (err, data) => {
      if (err) {
        if (err.code == "NoSuchKey") {
          callback(true); // user does not exist
        } else {
          callback(false); // error
        }
      } else {
        callback(false); // user exists
      }
    },
  );
}

// create new user
function User(username, email, password) {
  this.username = String(username);
  this.email = String(email);
  this.password = String(password);
}

function showMessage(setErrorMessage, setShowErrorMessage, showErrorMessage, message) {
  setErrorMessage(message);
  if (!showErrorMessage) {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 2200);
  }
}

const CreateAccountScreen = ({ navigation }) => {
  const [myEmail, setMyEmail] = useState("");
  const [myUsername, setMyUsername] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myConfirmPassword, setMyConfirmPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [proceed, setProceed] = useState(true);

  const showError = (message) => {
    setProceed(false);
    showMessage(setErrorMessage, setShowErrorMessage, showErrorMessage, message);
  };  

  const checkRequiredFields = () => {
    if (myEmail.length === 0) {
      showError("Please enter an email.");
      return false;
    } else if (myUsername.length === 0) {
      showError("Please enter a username.");
      return false;
    } else if (myPassword.length === 0) {
      showError("Please enter a password.");
      return false;
    } else if (myConfirmPassword.length === 0) {
      showError("Please confirm your password.");
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    if (!emailCheck(myEmail)) {
      showError("Invalid email. Please try again.");
      return false;
    }

    return true;
  };

  const validateUsernameLength = () => {
    if (myUsername.length < 6 || myUsername.length > 32) {
      showError("Username must be between 6 and 32 characters.");
      return false;
    }

    return true;
  };

  const checkPasswordMatch = () => {
    if (myPassword !== myConfirmPassword) {
      showError("Passwords do not match; Please try again.");
    } else {
      createNewUser();
    }
  };

  const createNewUser = () => {
    const userHash = myUsername + ".json";
    const passHash = sha256(myPassword);
    const newUser = new User(myUsername, myEmail, passHash);
    uploadObjectToS3("drip-users-eu", userHash, newUser);
    navigation.navigate("Map");
  };

  const handleCreateAccount = () => {
    setProceed(true); // Reset the proceed state before each attempt

    // Call functions in sequence
    if (checkRequiredFields() && validateEmail() && validateUsernameLength() && userCheckCondition) {
      userCheck(myUsername, (userDoesNotExist) => {
        if (userDoesNotExist) {
          checkPasswordMatch();
        } else {
          showError("Username already in use. Please try again.");
        }
      });
    }
  };
   
  const handleBack = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* back to login 
      <View style = {styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>&lt; Back to Login</Text>
        </TouchableOpacity>
      </View>
      */}
      <Header handler={handleBack} />

      {/* title */}
      <View style={styles.titleBox}>
        <Image style={styles.title} source={require("../assets/title.png")} />
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

      {/* create account */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpace} />

      {/* Error message display */}
      <ErrorMessage
        errorMessage={errorMessage}
        showErrorMessage={showErrorMessage}
      />
    </SafeAreaView>
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
  headerBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    marginTop: "5%",
  },
  backButton: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  backButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
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
    fontSize: 16,
  },
  button: {
    flex: 2,
    marginTop: "10%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  bottomSpace: {
    marginBottom: "5%",
  },
  errorMessageBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginHorizontal: "10%",
    borderRadius: 20,
    zIndex: 999,
  },
  errorMessage: {
    color: "#FF0000",
    flex: 1,
    fontSize: 14,
  },
});

CreateAccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateAccountScreen;
