import { ActivityIndicator, Alert, Button, Pressable, StatusBar, TextInput } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState} from 'react';
import { FIREBASE_AUTH, FIREBASE_STORE } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try{
            if(password !== confirmpassword){
                Alert.alert('Password do not match!');
            }
            else{
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = response._tokenResponse;
                try {
                    const userDoc = await addDoc(collection(FIREBASE_STORE, "users"), {
                      email: newUser.email,
                      name: name,
                      location: "",
                      favorites: [],
                      ingredients: [],
                    });              
                    console.log("Document written with ID: ", userDoc.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
            }
            
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
                <Text style={{ fontSize: 30, color: '#9C9C9C', fontWeight: 800 }}>Create Account</Text>
             </View>   
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={name} style={styles.input} placeholder="Full Name" autoCapitalize="none" onChangeText={(text) => setName(text)}></TextInput>
            <TextInput value={password} style={styles.input} secureTextEntry={true} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
            <TextInput value={confirmpassword} style={styles.input} secureTextEntry={true} placeholder="Confirm Password" autoCapitalize="none" onChangeText={(text) => setConfirmPassword(text)}></TextInput>

            { loading ? <ActivityIndicator size='large' color='#0000ff' />
            : 
                <TouchableOpacity onPress={signUp} style={styles.button_create}>
                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 800 }}>Create</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button_login}>
                <Text style={{ fontSize: 15, color: '#F15C02', fontWeight: 800  }}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    ) 

}

export default SignUp;

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
        marginBottom: 50,
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
    button_create: {
      backgroundColor: '#9C9C9C',
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
    button_login: {
        width: '97%',
        height: '120%',
        alignItems: 'center',
        marginTop: 250,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
    },
})