import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Auth from './src/navigation/Auth/Auth';

export default function App() {
  axios.defaults.baseURL = "https://48cb-154-160-6-71.ngrok-free.app/"
  return (
    <View style={styles.container}>
      <Auth />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
