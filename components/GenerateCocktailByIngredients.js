import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 


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

const GenerateCocktailByIngredients = ({ingredientsList}) => {
  const [ingredientlist, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [array, setArray] = useState([]);

  const [ingredient, setIngredient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [numberofIngredients, setNumberofIngredients] = useState('100')
  const [loading, setLoading] = useState(false);

  const apiKey = `1`;
  const apiListIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  async function loadIngredientList() {
    setLoading(true);
    try {
      let resp = await fetch(apiListIngredient);
      let respJson = await resp.json();
      { 
        respJson.drinks.forEach((drink) => {
          
          async function loadIngredient() {
            try{
              let apiSearchIngredient = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?i=${drink.strIngredient1}`;            
              let ingData = await fetch(apiSearchIngredient);
              let ingJson = await ingData.json();
              { ingJson ? 
                setIngredientList(oldArray => [...oldArray, ingJson.ingredients] )
              :                
                setIngredientList(oldArray => [...oldArray, null] )
              }
            }catch (error) {
              console.error('Error fetching data:', error);
              if (error.status === 500) {
                await new Promise((resolve, reject) => {
                  setTimeout(() => {
                      loadIngredient()
                      resolve()
                  }, 2000)
                })
              }
            } finally {
              setLoading(false);
            }
          }
          
        }) 
          
      }
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

  return(
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TextInput placeholder='Search cocktail...' style={styles.inputField} onChangeText={text => setSearchQuery(text)} />
        <TouchableOpacity title='submit'>
          <Text style={styles.buttonText}> Search</Text>
        </TouchableOpacity> 
      </View>

      <SafeAreaView style={styles.safe_container}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffba00" />
        ) : (
          <FlatList
            style={styles.ingredients_container}
            data={ingredientlist}
            renderItem={({ item }) => (
              <View style={styles.ingredients}>
                <View style={{ padding: 5, marginLeft: 20}}>
                  <Text style={styles.ingredient_label}>{item.strIngredient}</Text>
                  <Text style={styles.ingredient_info}>Alcohol: {item.strAlcohol} | Type: {item.strType} </Text>
                  <TouchableOpacity onPress={() => { navigation.navigate('Details', { ingredients: item }) }}>
                    <Text style={{ fontSize: 20, color: '#ffba00' }}>Details</Text>
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
    marginTop: 100,
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  safe_container: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 0,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: 350,
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

  ingredients: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    alignItems:'center',
    width: '40%',
    height: 80,
    flexDirection: 'row'
  },  
  
  ingredient_label: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500'
  },
  ingredient_info: {
    fontSize: 12,
    color: '#222',
    fontWeight: '500'
  },
});

export default GenerateCocktailByIngredients;