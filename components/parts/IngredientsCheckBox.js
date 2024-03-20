import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';

const IngredientsCheckBox = ({item, checkedvalues, onChange}) => {

    let updatedCheckedValues = [...checkedvalues];
    let active = updatedCheckedValues.includes(item);
    let thumbnail = `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png`;
    
    return (
        <TouchableOpacity 
            style={ active? [styles.ingredients, styles.activeChecked] : styles.ingredients}                
            onPress={() => { 
                if (active){
                    updatedCheckedValues = updatedCheckedValues.filter((checkedvalues) => checkedvalues!== item);
                    return onChange(updatedCheckedValues);
                }
                updatedCheckedValues.push(item);
                onChange(updatedCheckedValues);
            }} 
            key = {item}
        >   
            <Image style={styles.ingredient_img} source={{ uri: `${thumbnail}` }}></Image>
            <Text style={styles.ingredient_label}>{item}</Text> 
        </TouchableOpacity>    
    )
}

const styles = StyleSheet.create({
    ingredients: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#ddd',
        marginTop: 30,
        marginBottom: 3,
        flex: 1,
        alignItems:'center',
        width: '100%',
        height: 70,
        flexDirection: 'row'
    },  
    activeChecked:{
        backgroundColor: '#CCC5B9',
    },
    ingredient_img: {
      width: 100,
      height: 100
    },
    
    ingredient_label: {
        marginLeft: 10,
        fontSize: 15,
        color: '#222',
        fontWeight: '500'
    },

    ingredient_info: {
      fontSize: 10,
      color: '#222',
      fontWeight: '500'
    },

    checkbox: {
      alignSelf: 'center',
    },

  });

export default IngredientsCheckBox;