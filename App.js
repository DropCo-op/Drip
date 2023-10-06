import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold'}}>Drip By Drop</Text>
      </View>
      <View style={styles.map}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          style={{width: '100%', height: '50%'}}
        > 
        </MapView>
      </View>
      <Text>drip is the best app ever</Text>
      <StatusBar style="auto" />
    </View>
  );
}

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
  map: {
    width: '100%',
    height: '80%',
    position: 'relative', 
    paddingTop: "0%",
    top: '0%',
  },
});
