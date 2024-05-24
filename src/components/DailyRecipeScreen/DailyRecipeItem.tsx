import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DailyRecipes } from '@src/states/recipe';
import { Image as ExpoImage } from 'expo-image';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

export const DailyRecipeItem = ({
  item,
  onPressDailyRecipe,
}: {
  item: DailyRecipes['byId'][number];
  onPressDailyRecipe: (
    item: DailyRecipes['byId'][number],
    index: number,
  ) => void;
}) => {
  const navigation = useTypedNavigation();
  return (
    <View>
      {item.dailyRecipes.map((recipe, i) => {
        return (
          <TouchableOpacity
            key={`${item.id}-${i}`}
            onPress={() => {
              navigation.navigate('レシピ詳細', {
                recipeId: recipe.recipeId,
              });
            }}
          >
            <View
              style={[
                styles.recipeItem,
                { backgroundColor: recipe.isCreated ? '#f0f0f0' : 'white' },
              ]}
            >
              <View style={styles.recipeItemLeft}>
                <Icon
                  size={35}
                  name={
                    recipe.brunchType === 'breakfast'
                      ? 'weather-sunset'
                      : recipe.brunchType === 'lunch'
                        ? 'weather-sunny'
                        : recipe.brunchType === 'dinner'
                          ? 'weather-night'
                          : recipe.brunchType === 'snack'
                            ? 'food-apple'
                            : 'silverware-fork-knife'
                  }
                  color={
                    recipe.brunchType === 'breakfast'
                      ? 'gold'
                      : recipe.brunchType === 'lunch'
                        ? 'darksalmon'
                        : recipe.brunchType === 'dinner'
                          ? 'chocolate'
                          : recipe.brunchType === 'snack'
                            ? 'green'
                            : 'black'
                  }
                />
                <ExpoImage
                  style={styles.recipeImage}
                  source={{ uri: recipe.recipeImageUri }}
                />
                <Text style={styles.textStyle}>{recipe.recipeName}</Text>
                {recipe.isCreated && (
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    <Icon size={20} name={'check'} color={'red'} />
                    作成済
                  </Text>
                )}
              </View>
              <View>
                <LinearGradientButton
                  width={40}
                  height={40}
                  onPress={() => {
                    onPressDailyRecipe(item, i);
                  }}
                >
                  <Icon
                    name="clipboard-edit-outline"
                    size={20}
                    color={'white'}
                  />
                </LinearGradientButton>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  recipeItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
