import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          style={{width: '100%', height: '100%'}}
        /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    position: 'relative', 
    paddingTop: "0%",
    top: '0%',
  },
});

export default MapScreen;

