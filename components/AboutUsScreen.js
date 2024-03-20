import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutCocktailScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.aboutImage}>
        <Image
            source={require('../assets/header.png')}
            style={styles.imageStyle}
            />
        </View>
      <Text style={styles.aboutTitle}>About Cocktail Drink Mixer</Text>
      <Text style={[styles.aboutDescription, styles.centerText]}>Welcome to Cocktail Drink Mixer! 🍹
        Explore the world of mixology with our app that puts the power of crafting delicious cocktails right at your fingertips. Whether you're a seasoned bartender or a casual drink enthusiast, Cocktail Drink Mixer is your ultimate companion for discovering and creating the perfect drink for any occasion.
        With an extensive database of cocktails, complete with detailed instructions and ingredients, our app makes it easy to search for, learn about, and indulge in your favorite drinks. From classic cocktails to trendy concoctions, we've got you covered.
        Join our vibrant community of cocktail enthusiasts and elevate your mixology skills today with Cocktail Drink Mixer!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  aboutImage: {
    padding: 10,
    },
  imageStyle: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
},
  aboutTitle:{
    fontSize: 20,
    color: '#F15C02',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  aboutDescription:{
    fontSize: 20,
    color: '#F15C02',
    padding: 20,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default AboutCocktailScreen;
