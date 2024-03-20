import { ActivityIndicator, Alert, Button, Pressable, StatusBar, TextInput } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState} from 'react';
import { FIREBASE_AUTH, FIREBASE_STORE } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  auth = FIREBASE_AUTH;
    const signIn = async() => {
        setLoading(true); 
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            
            const querySnapshot = await getDocs(collection(FIREBASE_STORE, "users"));
            querySnapshot.forEach((userDoc) => {
                console.log(`${userDoc.id} => ${userDoc.data()}`);
            });

        } catch (error){
            console.log(error);
        } finally {
            setLoading(false);
        }    
    }

    return (
        <View style={styles.container}>
            <View style={styles.container_brand}>               
                <Image source={require('../assets/icon.png')} style={styles.image}/>
                <Text style={{ fontSize: 35, color: '#9C9C9C', fontWeight: 800 }}>Welcome!</Text>
                <Text style={{ fontSize: 20, color: '#9C9C9C', fontWeight: 600 }}>Login To continue</Text>
            </View>   
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} style={styles.input} secureTextEntry={true} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
        
            { loading ? <ActivityIndicator size='large' color='#0000ff' />
            : 
                <TouchableOpacity onPress={signIn} style={styles.button_login}>
                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 800 }}>Login</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} style={styles.button_create}>
                <Text style={{ fontSize: 15, color: '#F15C02', fontWeight: 800  }}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
        </View>
    ) 

}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    container_brand: {
        flex: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        marginBottom: 40,
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius:15,
        padding: 10,
        backgroundColor: '#fff'
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 20,
      marginBottom: 40,
    },
    button_login: {
      backgroundColor: '#F15C02',
      width: '100%',
      height: 50,
      alignItems: 'center',
      marginTop: 15,
      paddingTop:5,
      paddingBottom:5,
      height: 35,
      borderRadius: 15,
      justifyContent: 'center',
    },
    button_create: {
        width: '97%',
        height: '120%',
        alignItems: 'center',
        marginTop: 250,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
    },
})