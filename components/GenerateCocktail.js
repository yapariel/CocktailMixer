import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
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

const GenerateCocktail = ({ route, navigation }) => {
  const { selectedIngredient } = route.params;
  const lengthofselect = selectedIngredient.length;
  const [ cocktailIds, setCocktailIds] = useState([]);
  const [ filtercocktailIds, setfilterCocktailIds] = useState([]);
  const [ cocktails, setCocktails] = useState([]);
  const [ cocktailData, setCocktailData] = useState([]);
  const [ loading, setLoading] = useState(false);

  function getCocktailList(){
    setCocktailIds([]);
    selectedIngredient.forEach((ingredient, index) => {
      const apiListCocktail = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      searchCocktailbyIngredient(apiListCocktail, index)
    }); 
  } 

  async function searchCocktailbyIngredient(apiListCocktail, index) {
    try {
      setLoading(true);
      let resp = await fetch(apiListCocktail);
      let respJson = await resp.json();
      const listCocktail = respJson.drinks;
      let currentCocktailIds = cocktailIds;
      listCocktail.forEach((cocktail) => {
        let cocktailID = cocktail.idDrink;
        if(cocktailIds.indexOf(cocktailID) === -1) {
          currentCocktailIds.push(cocktailID);
        }    
      });
      setCocktailIds(currentCocktailIds);
      if(index == lengthofselect-1){
        currentCocktailIds.forEach((cocktailId) => {
          const apiCocktail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
          searchCocktailbyId(apiCocktail)
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {}
  }  

  function getCocktailIngredients(cocktail){
    let ingredients = [];
    for(i=1; i<16; i++){
      ingredients.push(cocktail['strIngredient'+i]);
    }
    return ingredients;
  }

  function includesAll(arr, values) {return values.every(v => arr.includes(v))};

  async function searchCocktailbyId(apiCocktail) {
    try {
      setLoading(true);
      let resp = await fetch(apiCocktail);
      let respJson = await resp.json();
      const thisCocktail = respJson.drinks[0];

      let currentfilterCocktailIds = filtercocktailIds;
      let thisCocktailIngredients = getCocktailIngredients(thisCocktail).filter(n => n)
      if (includesAll(thisCocktailIngredients, selectedIngredient)){       
        let currentcocktailID = thisCocktail['idDrink'];
        if(filtercocktailIds.indexOf(thisCocktail['idDrink']) === -1) {
          currentfilterCocktailIds.push(currentcocktailID);
          setCocktails(oldArray => [...oldArray, thisCocktail]);
        } 
      }      
      setfilterCocktailIds(currentfilterCocktailIds);
      
    } catch (error) {
      console.error('Error fetching data:', error); 
    } finally {
      setLoading(false); 
    }
  }  

  async function searchCocktailbyOnengredient(apiCocktail) {
    try {
      setLoading(true);
      let resp = await fetch(apiCocktail);
      let respJson = await resp.json();
      const theseCocktails = respJson.drinks;
      setCocktails(theseCocktails);      
    } catch (error) {
      console.error('Error fetching data:', error); 
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {  
    setLoading(true);
    if(selectedIngredient.length < 2){
      let searchCocktailApi =  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient[0]}`;
      searchCocktailbyOnengredient(searchCocktailApi);
    }
    else{
      getCocktailList();
    }
  }, [])
  
  return(
    <View style={styles.container}>
      
      <SafeAreaView style={styles.safe_container}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffba00" />
        ) : (
          <FlatList
            style={styles.ingredients_container}
            data={cocktails}
            renderItem={({ item }) => (
              <View style={styles.ingredients}>
                <Image style={styles.image} source={{ uri: `${item.strDrinkThumb}` }} />
                <View style={{ padding: 20, flexDirection: 'row' }}>
                  <Text style={styles.label}>{item.strDrink}</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate('Details', { ingredients: item }) }}>
                    <Text style={{ marginLeft: 55, fontSize: 15, color: '#555' }}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.container}>
                <Text>No cocktails found.</Text>
              </View>
            )}
          /> 
        )}
      </SafeAreaView>
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
  
  ingredients_container: {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 10,
    flex: 1,
    alignItem:'center',
    width: '100%',
  },

  ingredient:{
    width: 200,
    height: 200,
   },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 15,
    width: '60%',
    color: '#b84009',
    fontWeight: '700'
  },
});

export default GenerateCocktail;