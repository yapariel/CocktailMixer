import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import DetailsSurprise from './components/DetailsSurprise';
import Details from './components/Details';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='COCKTAIL MIXER'
          component={Home}
          options={({ route }) => ({
            header: (props) => (
              <View style={{ backgroundColor: '#fff' }}>
                <Header name={route?.name || 'COCKTAIL MIXER'} />
              </View>
            ),
          })}
        />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='Random Recommendation' component={DetailsSurprise} />
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
});
