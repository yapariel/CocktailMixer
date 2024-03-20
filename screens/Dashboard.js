import { ActivityIndicator, Alert, Button, Pressable, StatusBar, TextInput } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState} from 'react';
import { FIREBASE_AUTH, FIREBASE_STORE } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Dashboard = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  auth = FIREBASE_AUTH;

    return (
        <View style={styles.container}>
            <View style={styles.user_info}>

            </View>
            <View style={styles.user_favorite_cocktails}>

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
        backgroundColor: 'red',
        width: 'auto',
        height: 200
    },
    user_favorite_cocktails:{
        backgroundColor: 'blue',
        width: 'auto',
        height: 250
    },
    user_favorite_ingredients:{
        backgroundColor: 'green',
        width: 'auto',
        height: 250
    }
})