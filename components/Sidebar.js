import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const Sidebar = ({ onClose }) => {
  const sidebarWidth = width * 0.8;
  const sidebarPosition = new Animated.Value(-sidebarWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false);
  };
  openSidebar();

return (
    <Animated.View style={[styles.container, { transform: [{ translateX: sidebarPosition }] }]}>
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
          <Text style={styles.close}>x</Text>
          </TouchableOpacity>
            <View style={styles.sidebarImage}>
                    <Image
                            source={require('../assets/header.png')}
                            style={styles.imageStyle}
                    />
            </View>
            <View style={styles.sidebarText}>
                    <View style={styles.label}>
                    <Text style={styles.sidebarlabel}>My Profile</Text>
                    <Text style={styles.sidebarlabel}>Explore Cocktails</Text>
                    <Text style={styles.sidebarlabel}>Explore Ingredients</Text>
                    <TouchableOpacity onPress={toggleDropdown}>
                    <Text style={styles.sidebarlabel}>Filter By</Text>
                    </TouchableOpacity>
                    {showDropdown && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity onPress={() => selectFilter('Alcoholic')}>
                          <Text style={styles.dropdownOption}>Alcoholic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectFilter('Non-Alcoholic')}>
                          <Text style={styles.dropdownOption}>Non-Alcoholic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectFilter('Non-Alcoholic')}>
                          <Text style={styles.dropdownOption}>By Ingredient</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <Text style={styles.sidebarlabel}>Concoct Drinks</Text>
                    <Text style={styles.sidebarlabel}>About Us</Text>
                    </View>
            </View>
          <View style={styles.logoutbutton}>
            <Text style={styles.logout} onPress={closeSidebar}>Logout</Text>
          </View>
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
  close: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 20,
  },
  logout: {
    padding: 20,
    color: '#4F4F4F',
    fontWeight: 'bold',
    fontSize: 15, 
  },
  logoutbutton: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    padding: 20,
    color: '#4F4F4F',
    fontWeight: 'bold',
    fontSize: 15, 
  },
});

export default Sidebar;
