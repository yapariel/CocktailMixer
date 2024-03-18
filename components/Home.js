import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';

const Home = ({navigation}) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [numberofIngredients, setNumberofIngredients] = useState('100')
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
      </View>

      <TouchableOpacity style={styles.button}
      onPress={apiCall}
      title='submit'>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

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
  inputField: {
    height: '120%',
    width: '97%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    paddingLeft: 15
  },
  buttons:{
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#ffba00',
    width: '97%',
    height: '120%',
    alignItems: 'center',
    margin: 15,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {

    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20
  },
  label: {
    fontSize: 15,
    width: '60%',
    color: '#ffba00',
    fontWeight: '700'
  },
  ingredients: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 5
  }
})
export default Home;