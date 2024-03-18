import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

const DetailsSurprise = ({ route }) => {
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
                        {`${ingredients.strIngredient1}${ingredients.strMeasure1 ? ` - ${ingredients.strMeasure1}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient2 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient2}${ingredients.strMeasure2 ? ` - ${ingredients.strMeasure2}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient3 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient3}${ingredients.strMeasure3 ? ` - ${ingredients.strMeasure3}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient4 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient4}${ingredients.strMeasure4 ? ` - ${ingredients.strMeasure4}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient5 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient5}${ingredients.strMeasure5 ? ` - ${ingredients.strMeasure5}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient6 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient6}${ingredients.strMeasure6 ? ` - ${ingredients.strMeasure6}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient7 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient7}${ingredients.strMeasure7 ? ` - ${ingredients.strMeasure7}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient8 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient8}${ingredients.strMeasure8 ? ` - ${ingredients.strMeasure8}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient9 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient9}${ingredients.strMeasure9 ? ` - ${ingredients.strMeasure9}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient10 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient10}${ingredients.strMeasure10 ? ` - ${ingredients.strMeasure10}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient11 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient11}${ingredients.strMeasure11 ? ` - ${ingredients.strMeasure11}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient12 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient12}${ingredients.strMeasure12 ? ` - ${ingredients.strMeasure12}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient13 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient13}${ingredients.strMeasure13 ? ` - ${ingredients.strMeasure13}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient14 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient14}${ingredients.strMeasure14 ? ` - ${ingredients.strMeasure14}` : ''}, `}
                    </Text>
                )}
                {ingredients.strIngredient15 && (
                    <Text style={styles.ingredients}>
                        {`${ingredients.strIngredient15}${ingredients.strMeasure15 ? ` - ${ingredients.strMeasure15}` : ''}, `}
                    </Text>
                )}
                <View style={styles.item2}>
                <Text style={{ fontSize: 22, color: '#ffba00', fontWeight: '800' }}>
                Instructions:
                </Text>
                <Text style={styles.ingredients}> {ingredients.strInstructions}</Text>
                </View>
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
  item2: {
    marginTop: 5,
  },
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default DetailsSurprise;
