import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../utils/ErrorMessage';
import { s3 } from '../S3Storage';
import sha256 from 'js-sha256';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    s3.getObject({Bucket: 'drip-users-eu', Key: username.concat('.json')}, (err, data) => {
      if (err) {
        setLoading(false);
        // check username
        if (err.code == 'NoSuchKey') {
          setErrorMessage('Invalid username');
        }
        else {
          setErrorMessage('Cannot connect to server right now');
        }
        if (!showErrorMessage) {
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2200);
        }
      }
      else {
        // check password match
        let user = JSON.parse(data.Body.toString());
        setLoading(false);
        if (sha256(password) == user.password) {
          navigation.navigate('Map');
        }
        else {
          setErrorMessage('Incorrect password');
          if (!showErrorMessage) {
            setShowErrorMessage(true);
            setTimeout(() => {
              setShowErrorMessage(false);
            }, 2200);
          }
        }
      }
    });
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleForgotPassword = () => {
  };

  return (
    <SafeAreaView style={styles.container}>
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
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
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
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
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

      {/* loading indicator */}
      <ActivityIndicator style={styles.indicator} size="large" color="#FFFFFF" animating={loading}/>

      {/* error */}
      <ErrorMessage errorMessage={errorMessage} showErrorMessage={showErrorMessage}/>
    </SafeAreaView>
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
    marginBottom: "1%",
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
  indicator: {
    flex: 1,
    marginBottom: "20%"
  },
  bottomSpace: {
    flex: 1
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
    fontSize: 14
  }
});

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginScreen;

