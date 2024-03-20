import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Keyboard, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import  IngredientsModal  from "./parts/IngredientsModal";
export { IngredientsModal }


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

const ExploreIngredients = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [ingredientlist, setIngredientList] = useState([]);
  const [ingredientFilterlist, setFilteredIngredientList] = useState([]);
  const [withFilter, setWithFilter] = useState(false);
  const [modalIngredient, setModalIngredient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [ingFavorite, setIngFavorite] = useState([]);
  const [ingInventory, setIngInventory] = useState([]);


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

  async function loadIngredient(apiIngredient) {
    setLoading(true);
    try {
      let resp = await fetch(apiIngredient);
      let respJson = await resp.json();
      const thisIngredient = respJson.ingredients[0];     
      setModalIngredient(thisIngredient);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  const onPressItem = (item) =>{
    setModalVisible(true);
    const apiIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${item.strIngredient1}`;
    loadIngredient(apiIngredient);
  }

  const IngredientItem = ({item, index}) => {
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
            horizontal={false}
            style={styles.ingredients_container}
            numColumns={2} 
            data={ searchQuery ? ingredientFilterlist : ingredientlist } 
            renderItem= { IngredientItem }
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.container}>
                <Text>No cocktails found.</Text>
              </View>
            )}
          />     
        )}
      </SafeAreaView> 
      
      <Modal animationType='slide' transparent={true} visible={ isModalVisible } onRequestClose= {()=> setModalVisible(false)}>
        <View style={styles.modal_container}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.hide_modal_area} onPress= {()=> setModalVisible(false)} >
              <Text style={styles.hide_modal}>Hide</Text>
            </TouchableOpacity>
            <IngredientsModal 
              item = {modalIngredient} 
              favorites={ingFavorite} 
              inventory={ingInventory} 
              onChangeFavorite={setIngFavorite} 
              onChangeInventory={setIngInventory}
             />
          </View>
        </View>
      </Modal>        
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
    backgroundColor: 'white'
  },
  safe_container: {
    width: '100%',
    height: 300,
    marginTop: 5,
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
  ingredients: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginTop: 40,
    width: '45%',
    marginLeft:5,
    marginRight: 5,
    height: 70, 
    justifyContent: 'center',
    alignContent: 'center',
  },  
  activeChecked:{
      backgroundColor: '#CCC5B9',
  },
  ingredient_img: {
    width: 70,
    height: 100,
  },
  ingredient_label: {
    marginLeft: 5,
    fontSize: 12,
    color: '#222',
    fontWeight: '500'
  },

  ingredient_info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal_container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal:{
    backgroundColor: 'white',
    padding: 15,
    width: '100%',
    alignSelf: 'end',
    height: 400,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.46,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
  },
  hide_modal_area:{
    alignItems: 'flex-end',
    marginRight: 10,
    
  },
  hide_modal:{
    height: 20,
    fontSize: 13,
    color: '#252422',
    fontWeight: '800'
  }
});

export default ExploreIngredients;