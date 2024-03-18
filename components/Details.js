import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const Details = ({ route }) => {
  const { ingredients } = route.params;

  return (
    <ScrollView>
      <View style={styles.details}>
        <View style={styles.item}>
          <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
            Name:
          </Text>
          <Text style={styles.ingredients}> {ingredients.strDrink}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
            Ingredients and Measurements:
          </Text>
          {ingredients.strIngredient1 && (
            <Text style={styles.ingredients}>
              {`${ingredients.strIngredient1} - ${ingredients.strMeasure1}`}
            </Text>
          )}
          {ingredients.strIngredient2 && (
            <Text style={styles.ingredients}>
              {`${ingredients.strIngredient2} - ${ingredients.strMeasure2}`}
            </Text>
          )}
          {ingredients.strIngredient3 && (
            <Text style={styles.ingredients}>
              {`${ingredients.strIngredient3} - ${ingredients.strMeasure3}`}
            </Text>
          )}
          {/* Continue this pattern for other ingredients and measurements */}
        </View>

        <View style={styles.item}>
          <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
            Category:
          </Text>
          <Text style={styles.ingredients}> {ingredients.strCategory}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
            Instructions:
          </Text>
          <Text style={styles.ingredients}> {ingredients.strInstructions}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
            Tags:
          </Text>
          {/* Assuming mealType is the tag field */}
          <Text style={styles.ingredients}> {ingredients.strTags}</Text>
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
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Details;
