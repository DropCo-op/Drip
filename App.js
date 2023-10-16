// react native
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text } from 'react-native';

// local
import LoginScreen from './screens/Login.js';
import MapScreen from './screens/Map.js';
import CreateAccountScreen from './screens/CreateAccount.js';
import SubmitRatingsScreen from "./screens/Ratings.js";

// backend
import AWS from 'aws-sdk';
import awsCredentials from './aws-credentials.json';
AWS.config.update({
  region: 'eu-west-3',
  accessKeyId: awsCredentials.accessKeyId,
  secretAccessKey: awsCredentials.secretAccessKey
});

// test object
const key = 'myObject.json';
const myObject = {
  key1: 'hello',
  key2: 'world',
};

// upload
const s3 = new AWS.S3();
const params = {
  Bucket: 'drip-fountains-eu',
  Key: key, // The key (filename) under which the JSON object will be stored
  Body: JSON.stringify(myObject),
  ContentType: 'application/json', // Specify the content type as JSON
};

s3.upload(params, (err, data) => {
  if (err) {
    console.error('Error uploading object:', err);
  } else {
    console.log('Object uploaded:', data.Location);
  }
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Ratings" component={SubmitRatingsScreen}/>
	        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          {/* Add other screens and navigation options here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#ECCAFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '12%',
    paddingTop: '15%',
    position: 'relative', 
    top: 1,
  },

});

export default App;

