import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Home = ({navigation}) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = `1`;
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?s=${searchQuery}`;

  async function apiCall() {
  setLoading(true);
  try {
    let resp = await fetch(apiUrl);
    let respJson = await resp.json();
    console.log('Response JSON:', respJson);
    setIngredients(respJson.drinks || []);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
  Keyboard.dismiss();
  setSearchQuery('');
}

  const fetchRandomCocktail = async () => {
    setLoading(true);
    try {
      let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      let respJson = await resp.json();
      console.log('Random Cocktail:', respJson.drinks[0]);
      navigation.navigate('Random Recommendation', { ingredients: respJson.drinks[0] });
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
    apiCall()
  }, [])

  return(
    <View style={styles.container}>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TextInput placeholder='Search cocktail...'
      style={styles.inputField}
      onChangeText={text => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.button}
      onPress={apiCall}
      title='submit'>
        <FontAwesome name="search" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={fetchRandomCocktail}>
          <FontAwesome name="gift" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffba00" />
        ) : (
          <FlatList
            style={styles.ingredients}
            data={ingredients}
            renderItem={({ item }) => (
              <View style={styles.ingredients}>
                <Image style={styles.image} source={{ uri: `${item.strDrinkThumb}` }} />
                <View style={{ padding: 20, flexDirection: 'row' }}>
                  <Text style={styles.label}>{item.strDrink}</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate('Details', { ingredients: item }) }}>
                    <Text style={{ marginLeft: 50, fontSize: 20, color: '#ffba00' }}>Details</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
    ingredients: {
    fontSize: 20,
    color: '#ffba00',
  },
  inputField: {
    height: '60%',
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 15
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#f35c02',
    width: '10%',
    height: '50%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 5,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10
  },
  button1: {
    backgroundColor: '#f38901',
    width: '10%',
    height: '50%',
    alignItems: 'center',
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    color: '#ffba00',
    fontWeight: '700'
  },
  recipe: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 5
  },

});

export default Home;