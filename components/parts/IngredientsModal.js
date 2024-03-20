import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const IngredientsModal= ({item, favorites, inventory, onChangeFavorite, onChangeInventory}) => {

    let updatedFavorites = [...favorites];
    let isFavorite = updatedFavorites.includes(item.idIngredient);

    let updatedInventory = [...inventory];
    let addedInventory = updatedInventory.includes(item.idIngredient);

    let key_inventory = 'inv_' + item.idIngredient;
    let key_fav = 'fav_' + item.idIngredient;

    let thumbnail = `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient}.png`;
    
    const str = `${item.strDescription}`;    
    let description = str == 'null' ? '' : str.substring(0, str.indexOf("\r\n"));
    description = description.length > 500 ? str.substring(0, 500) : description ; //starts from 0
    return (
        <View style={styles.ingredients}>
            <Text style={styles.ingredient_label}>{item.strIngredient}</Text>
            <Text style={styles.ingredient_info}>Type: {item.strType}</Text>
            <View style={styles.ingredient_details}>
                <Image style={styles.ingredient_img} source={{ uri: `${thumbnail}` }}/>
                <Text style={styles.ingredient_desc}>{description}</Text>
                <View style={styles.ingredient_options}>
                    <TouchableOpacity 
                        style={styles.ingredient_options_inventory}
                        onPress={() => { 
                            if (addedInventory){
                                updatedInventory = updatedInventory.filter((inventory) => inventory!== item.idIngredient);
                                return onChangeInventory(updatedInventory);
                            }
                            updatedInventory.push(item.idIngredient);
                            onChangeInventory(updatedInventory);
                        }} 
                        key = {key_inventory}
                    >
                        <MaterialCommunityIcons
                            size={24}
                            name={ addedInventory ? "minus"  : "plus" } 
                            color="white" />
                        <Text style={{ textAlign: 'center', fontSize: 12, color: 'white', fontWeight:'500'}}>
                            { addedInventory ? 'Remove Inventory' : 'Add to Inventory' }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ingredient_options_favorite}
                        onPress={() => { 
                            if (isFavorite){
                                updatedFavorites = updatedFavorites.filter((favorites) => favorites!== item.idIngredient);
                                return onChangeFavorite(updatedFavorites);
                            }
                            updatedFavorites.push(item.idIngredient);
                            onChangeFavorite(updatedFavorites);
                        }} 
                        key = {key_fav} 
                    >
                        <AntDesign
                            size  = {24} 
                            name  = { isFavorite ? "heart"  : "hearto" }
                            color = { isFavorite ? "#eb5e28"  : "#252422" } 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ingredients: {
        width: '100%',
        flex: 1
    },  

    ingredient_details: {
        flex: 1, 
        width: '100%',
        flexDirection: 'row', 
        paddingTop: 30,
        margin: 0,
        padding: 0,
    },

    ingredient_img: {
        flex: 1,
        width: 350,  
        height: 380,
        left: '-30%', 
        bottom: '-20%', 
        top: 8,
        alignSelf: 'flex-end',
        position: 'absolute'
    },
    
    ingredient_label: {
        marginLeft: 10,
        fontSize: 25,
        color: '#EB5E28',
        fontWeight: '800'
    },

    ingredient_info: {
      fontSize: 13,
      marginLeft: 10,
      color: '#555',
      fontWeight: '500'
    },
    
    ingredient_desc: {
        fontSize: 13,
        color: '#555',
        fontWeight: '700', 
        position: 'absolute',
        width: '65%',
        right: 5,
        textAlign: 'right'
    },

    ingredient_options:{
        position: 'absolute',
        height: 40,
        width: 180,
        right: 0,
        bottom: 0,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },

    ingredient_options_inventory:{
        backgroundColor: '#403d39',
        borderRadius: 20,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 5,
    }, 
    ingredient_options_favorite:{
        marginLeft: 5,
    }

    

  });

export default IngredientsModal;