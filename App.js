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
import MoreInfoScreen from "./screens/MoreInfo.js";

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
          <Stack.Screen name="MoreInfo" component={MoreInfoScreen} />
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

