import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './components/Home';
import DetailsSurprise from './components/DetailsSurprise';
import Details from './components/Details';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <NavigationContainer>
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
