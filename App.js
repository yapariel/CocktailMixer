import React, { useState, useEffect}  from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font'

// import WelcomeScreen from '../screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import Home from './components/Home';
import DetailsSurprise from './components/DetailsSurprise';
import Details from './components/Details';
import Header from './components/Header';

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/FirebaseConfig';

const Stack = createNativeStackNavigator();

function LoggedLayout(){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='COCKTAIL MIXER'
        component={Home}
        options={({ route, navigation }) => ({
              header: (props) => (
                  <View style={styles.headerContainer}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.homedrawer}>
                          <Image source={require('./assets/bars.png')} style={styles.drawer} />
                      </TouchableOpacity>
                      <Header name={route?.name || 'Details'} navigation={navigation} />
                  </View>
              ),
          })}
      />
      <Stack.Screen
          name='Details'
          component={Details}
          options={({ route, navigation }) => ({
              header: (props) => (
                  <View style={styles.headerContainer}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                          <Image source={require('./assets/left-arrow.png')} style={styles.arrow} />
                      </TouchableOpacity>
                      <Header name={route?.name || 'Details'} navigation={navigation} />
                  </View>
              ),
          })}
      />
      <Stack.Screen
          name='Random Recommendation'
          component={DetailsSurprise}
          options={({ route, navigation }) => ({
              header: (props) => (
                  <View style={styles.headerContainer}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                          <Image source={require('./assets/left-arrow.png')} style={styles.arrow} />
                      </TouchableOpacity>
                      <Header name={route?.name || 'Details'} navigation={navigation} />
                  </View>
              ),
          })}
      />
    </Stack.Navigator>
  )
}

function AuthLayout(){
  return (       
    <Stack.Navigator      
      screenOptions={{
        cardStyle: {
      backgroundColor: '#0e1529'
    },
    headerShown: false
    }}
  >
    {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [loaded] = useFonts({
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Black-Italic": require("./assets/fonts/Montserrat-BlackItalic.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("./assets/fonts/Montserrat-BoldItalic.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtaBoldItalic": require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Montserrat-ExtaLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-ExtaLightItalic": require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-LightItalic": require("./assets/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-MediumItalic": require("./assets/fonts/Montserrat-MediumItalic.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-SemiBoldItalic": require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-ThinItalic": require("./assets/fonts/Montserrat-ThinItalic.ttf"),
    "Gotu-Regular": require("./assets/fonts/Gotu-Regular.ttf")
  })

  if (!loaded) {
    return null
  }
  
  
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    })
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? 
          <Stack.Screen name ='UserStack' component={LoggedLayout} options={{headerShown: false}}/>
        :
          <Stack.Screen name ='AuthStack' component={AuthLayout}  options={{headerShown: false}} />
        }        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  drawer: {
    width: 25,
    height: 30,
  },
  homedrawer: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 45,
    paddingTop: 10,
    marginLeft: 15,
    alignContent: 'left',
    alignItems: 'left',
  },
  back: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 50,
    paddingTop: 10,
    marginLeft: 15,
    alignContent: 'left',
    alignItems: 'left',
  },
});
