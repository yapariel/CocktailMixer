import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

const DetailsSurprise = ({ route }) => {
  const { ingredients } = route.params;
  const [ingredientImages, setIngredientImages] = useState({});

    useEffect(() => {
        const fetchIngredientImages = async () => {
        const ingredientImagesData = {};
        const ingredientsList = [];
        
        for (let i = 1; i <= 15; i++) {
            const ingredientName = ingredients[`strIngredient${i}`];
            if (ingredientName) {
            ingredientsList.push(ingredientName);
            }
        }
            await Promise.all(
            ingredientsList.map(async (ingredient) => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`);
                const imageUrl = response.ok ? `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` : 'https://www.thecocktaildb.com/images/ingredients/default.jpg';
                ingredientImagesData[ingredient] = imageUrl;
            } catch (error) {
                console.error('Error fetching ingredient image:', error);
            }
            })
        );
        setIngredientImages(ingredientImagesData);
        };

        fetchIngredientImages();
    }, [ingredients]);

    const chunkArray = (array, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

return (
    <ScrollView>
        <View style={styles.details}>
            <View style={styles.header}>
                <Text style={{ fontSize: 22, color: '#F15C02', fontWeight: '800' }}>
                    Random Cocktail for you 🍸
                </Text>
            </View>
            <View style={styles.thumb}>
           <Image style={styles.image} source={{ uri: ingredients.strDrinkThumb }} />
            <View style={styles.titlebg}>
            <Text style={styles.title}> {ingredients.strDrink}</Text>
            </View>
            </View>
                {chunkArray(Object.entries(ingredientImages), 2).map((chunk, index) => (
                <View key={index} style={styles.itemRow}>
                    {chunk.map(([ingredient, imageUrl]) => (
                    <View key={ingredient} style={styles.column}>
                        <Image style={styles.image2} source={{ uri: imageUrl }} />
                        <Text style={styles.ingredients2}>{ingredients[`strMeasure${index + 1}`]} {ingredient}</Text>
                    </View>
                    ))}
                </View>
                ))}
                <View style={styles.item}>
                <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
                Instructions:
                </Text>
                <Text style={styles.ingredients}>{ingredients.strInstructions}</Text>
                </View>
            <View style={styles.item}>
                <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
                    Category:
                </Text>
                <Text style={styles.ingredients}> {ingredients.strCategory}</Text>
            </View>

            <View style={styles.item}>
                <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
                    Glass:
                </Text>
                <Text style={styles.ingredients}> {ingredients.strGlass}</Text>
            </View>

            <View style={styles.item}>
                <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
                    Tags:
                </Text>
                <Text style={styles.ingredients}> {ingredients.strTags || 'None'}</Text>
            </View>
        </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
  details: {
    marginBottom: 30,
    padding: 2,
  },
  ingredients: {
    fontSize: 20,
    color: '#ffba00',
  },
  ingredients2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffba00',
    textAlign: 'center',
  },
  item2: {
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
    image2: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  thumb: {
    padding: 10,
  },
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 7,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
    itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  column: {
    width: '48%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    elevation: 5,
    borderRadius: 7,
    padding: 10,
  },
  header: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    color: '#F15C02',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: '#ffba00',
    bottom: 0,
    padding: 5,
  },
  titlebg: {
    fontSize: 50,
    color: '#ffba00',
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    margin: 10,
  },
});

export default DetailsSurprise;
