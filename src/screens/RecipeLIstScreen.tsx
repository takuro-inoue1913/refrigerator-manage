import { useRequestGetAllRecipes } from '@src/interface/hooks/recipe/useRequestGetAllRecipes';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

export const RecipeListScreen = () => {
  const navigation = useTypedNavigation();
  useRequestGetAllFridgeMaster();
  const { recipes } = useRequestGetAllRecipes();

  const recipeData = recipes.ids.map((id) => {
    const recipe = recipes.byId[id];
    return {
      id: recipe.id,
      name: recipe.name,
      imageUrl: recipe.imageUri,
    };
  });

  const onPressRecipe = (recipeId: string) => {
    navigation.navigate('レシピ編集', { recipeId });
  };

  const renderItem = ({ item }: { item: (typeof recipeData)[number] }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => onPressRecipe(item.id)}
    >
      <ExpoImage source={{ uri: item.imageUrl }} style={styles.recipeImage} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#e1e4e8',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
  },
  recipeImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 18,
  },
});
