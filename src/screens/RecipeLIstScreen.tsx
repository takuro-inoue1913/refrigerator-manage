import { useRequestGetAllRecipes } from '@src/interface/hooks/recipe/useRequestGetAllRecipes';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { LoadingMask } from '@src/components/common/LoadingMask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequestDeleteRecipe } from '@src/interface/hooks/recipe/useRequestDeleteRecipe';
import { useRecipesActions } from '@src/states/recipe/actions';
import Toast from 'react-native-toast-message';
import { deleteUserImage } from '@src/interface/firebase/deleteUserImage';

export const RecipeListScreen = () => {
  const navigation = useTypedNavigation();
  const { isFetching: isFetchingFridgeMaster } = useRequestGetAllFridgeMaster();
  const { recipes, isFetching: isFetchingRecipes } = useRequestGetAllRecipes();
  const requestDeleteRecipe = useRequestDeleteRecipe();
  const { deleteRecipe, deleteDailyRecipeByRecipeId } = useRecipesActions();
  const [isProcessing, setIsProcessing] = React.useState(false);

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

  const onPressDeleteRecipe = (recipeId: string) => {
    Alert.alert(
      '本当に削除しますか？',
      '削除すると、カレンダーに記録した対象のレシピも削除されます。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          onPress: async () => {
            setIsProcessing(true);
            await requestDeleteRecipe({ recipeId });
            await deleteUserImage(recipes.byId[recipeId].imageUri);
            deleteRecipe(recipeId);
            deleteDailyRecipeByRecipeId(recipeId);

            setIsProcessing(false);
            Toast.show({
              type: 'success',
              text1: '削除しました',
            });
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: (typeof recipeData)[number] }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => onPressRecipe(item.id)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ExpoImage source={{ uri: item.imageUrl }} style={styles.recipeImage} />
        <Text>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.trashIcon}
        onPress={() => onPressDeleteRecipe(item.id)}
      >
        <Icon name="trash-can-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {(isFetchingRecipes || isFetchingFridgeMaster || isProcessing) && (
        <LoadingMask />
      )}
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>レシピが登録されていません</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
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
  trashIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#dc3545',
  },
});
