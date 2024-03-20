import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import  IngredientsCheckBox  from "./parts/IngredientsCheckBox";
export { IngredientsCheckBox }



// const UserInfo = async() => {
//   const userDocument = useState({});
//   try {
//     userDocument = await getDocs(collection(FIREBASE_STORE, "users"));
//     userDocument.forEach((userDoc) => {
//         console.log(`${userDoc.id} => ${userDoc.data()}`);
//     }); 
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   } finally {
//   }

// };

const SearchIngredients = ({ navigation }) => {
  const [ingredientlist, setIngredientList] = useState([]);
  const [ingredientFilterlist, setFilteredIngredientList] = useState([]);
  const [withFilter, setWithFilter] = useState(false);
  const [checkedlist, setCheckedIngredient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const apiListIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  async function loadIngredientList() {
    setLoading(true);
    try {
      let resp = await fetch(apiListIngredient);
      let respJson = await resp.json();
      const listIngredients = respJson.drinks;      
      listIngredients.sort((a, b) => {
        const nameA = a.strIngredient1.toUpperCase(); 
        const nameB = b.strIngredient1.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setIngredientList(listIngredients); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
    Keyboard.dismiss();
    setSearchQuery('');
  }
  
  useEffect(() => {
    setLoading(true)
    loadIngredientList()
  }, [])
 
  async function filterIngredients(){
    try {
      if(searchQuery == null){
        setWithFilter(false)
      }
      else{
        let unfiltered = ingredientlist;
        let filtered = unfiltered.filter(item => item.strIngredient1.includes(searchQuery));
        setFilteredIngredientList(filtered);
        setWithFilter(true);
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  function checkSelectedIngredients(){ 
    if(checkedlist.length > 0){ 
      navigation.navigate('Concoct Cocktails', { selectedIngredient: checkedlist }) 
    }else{
      Alert.alert('Select at least one ingredient');
    }
  }

  return(
    <View style={styles.container}>
      
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TextInput placeholder='Search ingredient ...' style={styles.inputField} onChangeText={(text) => { setSearchQuery(text); filterIngredients(); }} />
        <TouchableOpacity title='submit' onPress={ filterIngredients } >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity> 
      </View>

      <SafeAreaView style={styles.safe_container}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffba00" />
        ) : (
          <FlatList
            style={styles.ingredients_container}
            data={ searchQuery ? ingredientFilterlist : ingredientlist } 
            renderItem={({ item }) => (
              <IngredientsCheckBox
                item = {item.strIngredient1}
                checkedvalues = {checkedlist}
                onChange = {setCheckedIngredient}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.container}>
                <Text>No ingredient found.</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>

      <TouchableOpacity style={styles.generate_cocktail} 
        onPress={checkSelectedIngredients}
      >
          <Text style={{ fontSize: 15, color: '#fff', fontWeight: 800 }}>Generate Cocktail</Text>
      </TouchableOpacity> 
    </View>
  )
}  

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  safe_container: {
    width: '100%',
    height: 300,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 0,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: 340,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff'
  },
  buttonText: {
    paddingLeft: 10
  },

  ingredients_container: {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 10,
    flex: 1,
    alignItem:'center',
    width: '100%',
  },

  generate_cocktail:{
    backgroundColor: '#EB5E28',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',

  }
});

export default SearchIngredients;