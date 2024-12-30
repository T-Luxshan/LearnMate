import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './src/screens/authentication/Login';
import GettingStarted from './src/screens/GettingStarted'
import SignUpform from './src/screens/authentication/SignUpForm'
// import LabourSignUpForm from './src/screens/authentication/LabourSignUpForm';
import SignInWithGoogle from './src/components/SignInWithGoogle';
import ForgotPassword from './src/screens/authentication/ForgotPassword';
import OTPVerification from './src/screens/authentication/OTPVerification';
import ChangePassword from './src/screens/authentication/ChangePassword';
import HomePage from './src/screens/HomePage';
import { Provider } from "react-redux";
import store from "./src/redux/store"

const Stack = createStackNavigator();

export default function App() {

  return (
    
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInWithGoogle"
          component={SignInWithGoogle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpform"
          component={SignUpform}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
 
  </Provider> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
