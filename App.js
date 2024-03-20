import React, { useState, useEffect}  from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useFonts } from 'expo-font'

// import WelcomeScreen from '../screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';


import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import DetailsSurprise from './components/DetailsSurprise';
import Details from './components/Details';
import SearchIngredients from './components/SearchIngredients';
import GenerateCocktail from './components/GenerateCocktail';
import ExploreIngredients from './components/ExploreIngredients';
import AboutUsScreen from './components/AboutUsScreen';

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/FirebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    })
  }, []);

  if (initializing) return null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function LoggedLayout(){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='COCKTAIL MIXER'
          component={Home}
          options={({ route, navigation }) => ({
                header: (props) => (
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={toggleSidebar} style={styles.homedrawer}>
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
        <Stack.Screen
            name='Explore Ingredients'
            component={ExploreIngredients}
            options={({ route, navigation }) => ({
                header: (props) => (
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                            <Image source={require('./assets/left-arrow.png')} style={styles.arrow} />
                        </TouchableOpacity>
                        <Header name={route?.name || 'ExploreIngredients'} navigation={navigation} />
                    </View>
                ),
            })}
        />
        <Stack.Screen
            name='Search Ingredients'
            component={SearchIngredients}
            options={({ route, navigation }) => ({
                header: (props) => (
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                            <Image source={require('./assets/left-arrow.png')} style={styles.arrow} />
                        </TouchableOpacity>
                        <Header name={route?.name || 'ExploreIngredients'} navigation={navigation} />
                    </View>
                ),
            })}
        />        
        <Stack.Screen
            name='Concoct Cocktails'
            component={GenerateCocktail}
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
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
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
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {user ? 
        <Stack.Screen name ='UserStack' component={LoggedLayout} options={{headerShown: false}}/>
      :
        <Stack.Screen name ='AuthStack' component={AuthLayout}  options={{headerShown: false}} />
      }  
      </Stack.Navigator>
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
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
