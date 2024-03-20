import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const Sidebar = ({ onClose }) => {
  const sidebarWidth = width * 0.8;
  const sidebarPosition = new Animated.Value(-sidebarWidth);

  const openSidebar = () => {
    Animated.timing(sidebarPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarPosition, {
      toValue: -sidebarWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  openSidebar();

return (
    <Animated.View style={[styles.container, { transform: [{ translateX: sidebarPosition }] }]}>
        <View style={styles.sidebar}>
            <View style={styles.sidebarImage}>
                    <Image
                            source={require('../assets/header.png')}
                            style={styles.imageStyle}
                    />
            </View>
            <View style={styles.sidebarText}>
                    <View style={styles.label}>
                    <Text style={styles.sidebarlabel}>My Profile</Text>
                    <Text style={styles.sidebarlabel}>My Favorites</Text>
                    <Text style={styles.sidebarlabel}>Alcoholic</Text>
                    <Text style={styles.sidebarlabel}>Non Alcoholic</Text>
                    <Text style={styles.sidebarlabel}>Search by Ingredients</Text>
                    <Text style={styles.sidebarlabel}>About Us</Text>
                    </View>
            </View>
            <Text onPress={closeSidebar}>Close Sidebar</Text>
        </View>
    </Animated.View>
);
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '80%',
    backgroundColor: '#EFEFEF',
    zIndex: 1000,
  },
  sidebar: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  imageStyle: {
    width: 200,
    height: 100,
    resizeMode: 'contain'
    },
  sidebarImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F15C02',
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    },
  sidebarlabel: {
    color: '#F15C02',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    },
  sidebarText: {
    marginTop: 30,
    marginLeft: 30,
    },
  dropdown: {
    marginTop: 5,
    marginLeft: 15,
  },
  dropdownOption: {
    fontSize: 18,
    paddingVertical: 5,
    color: '#F15C02',
  },
  dropdownIcon: {
     width: 15,
     height: 15,
     overlayColor: 'white',
  },
});

export default Sidebar;
