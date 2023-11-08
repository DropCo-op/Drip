import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save the user's authentication status
export async function saveAuthenticationStatus(isAuthenticated) {
  try {
    await AsyncStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  } catch (error) {
    console.error('Error saving authentication status:', error);
  }
};

// Function to retrieve the user's authentication status
export async function getAuthenticationStatus() {
  try {
    const isAuthenticated = JSON.parse(await AsyncStorage.getItem('isAuthenticated'));
    return isAuthenticated;
  } catch (error) {
    console.error('Error retrieving authentication status:', error);
    return false; // Return a default value or handle the error as needed
  }
};

