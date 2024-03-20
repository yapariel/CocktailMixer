import { ActivityIndicator, Alert, Button, Pressable, StatusBar, TextInput } from "react-native";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState} from 'react';
import { FIREBASE_AUTH, FIREBASE_STORE } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Dashboard = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [favIngredients, setFavoriteIngredients] = useState('');
    
    const [loading, setLoading] = useState(false);
    const  auth = FIREBASE_AUTH;
    
    const IngredientFavorite = ({item, index}) => {
        let thumbnail = `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png`;
        return (
          <TouchableOpacity 
            onPress = {() => onPressItem(item)} 
            style={ styles.ingredients }            
            key = {item}
          >
            <View style={styles.ingredient_info}>
                <Image style={styles.ingredient_img} source={{ uri: `${thumbnail}` }}></Image>
                <Text style={styles.ingredient_label}>{item.strIngredient1}</Text>
            </View>           
          </TouchableOpacity>    
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.user_info}>
                <Image source={require('../assets/person.png')} style={styles.profile_img}/>
                <Text style={styles.profile_name}>Rajeesdadasd S. adsad</Text>
                <Text style={styles.profile_email}>dasdasd@gmail.com</Text>
            </View>
            <View style={styles.user_favorite_cocktails}>
                <Text style={styles.favorite_label}>Favorites Ingredients</Text>
                <SafeAreaView style={styles.safe_container_favorite_ingredients}>
                    {loading ? (
                    <ActivityIndicator size="large" color="#ffba00" />
                    ) : (
                    <FlatList
                        horizontal={true}
                        style={styles.ingredients_container}
                        data={favIngredients} 
                        renderItem= { IngredientFavorite }
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                        <View style={styles.container}>
                            <Text>No Ingredient found.</Text>
                        </View>
                        )}
                    />     
                    )}
                </SafeAreaView>
            </View>
            <View style={styles.user_favorite_ingredients}>

            </View>
        </View>
    ) 

}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignContent: 'center'
    },
    user_info:{
        width: 'auto',
        height: 300,
    },
    user_favorite_cocktails:{
        marginTop: 5,
        width: 'auto',
        height: 250
    },
    user_favorite_ingredients:{
        backgroundColor: 'green',
        width: 'auto',
        height: 250
    },
    profile_img:{
        width: 200,
        height:200,
        alignSelf: 'center',
        marginTop: 20
    },
    profile_name:{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '500',     
        color: '#c75504'
    },
    profile_email:{
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '500',     
        color: '#777'
    },
    favorite_label:{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '500',     
        color: '#6b3703'
    },
    safe_container_favorite_ingredients:{
        alignContent: 'center',
        justifyContents: 'center',
        flex: 1,
        alignItems: 'center'
    },
    ingredients_container:{
        alignContent: 'center',
        justifyContents: 'center',
    }
})