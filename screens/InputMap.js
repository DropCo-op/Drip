import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import BackBtn from "../utils/BackBtn";

const InputMapScreen = ({ navigation }) => {

	const handleBackNavigation = () => {
    		navigation.navigate("Map");
  	};

	const handleDrag = () => {
		console.log(region);
	};

	return (
		<View style={styles.container}>
 			<View>
        			<TouchableOpacity onPress={handleBackNavigation}>
          				<Text style={styles.backButton}>&lt; Back</Text>
        			</TouchableOpacity>
			</View>

			<View style={styles.map}>

				<MapView       
          			//	region={initialLocation}
          				style={{ width: "100%", height: "100%" }}
        				onRegionChangeComplete={handleDrag}
				>
		
				</MapView>
			</View>
		</View>		
	);
}

const styles = StyleSheet.create({
	backButton: {
    		paddingTop: "10%",
    		paddingLeft: "5%",
    		fontSize: 18,
    		color: "grey",
  	},
	map: {
    		width: "100%",
    		height: "100%",
    		position: "relative",
    		paddingTop: "2%",
    		top: "0%",
  	},
});

export default InputMapScreen;
