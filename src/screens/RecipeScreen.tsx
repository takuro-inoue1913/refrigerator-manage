import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { CommonGradation } from '@src/components/common/CommonGradation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useRequestGetUsersDailyRecipes } from '@src/interface/hooks/recipe/useRequestGetUsersDailyRecipes';
import { LoadingMask } from '@src/components/common/LoadingMask';
import { DailyRecipes } from '@src/states/recipe';
import CachedImage from 'expo-cached-image';
import { LinearGradientButton } from '@src/components/common/GradationButton';

export const RecipeScreen = () => {
  const { isLoading, dailyRecipes } = useRequestGetUsersDailyRecipes(
    dayjs().startOf('month').format('YYYY-MM-DD'),
    dayjs().endOf('month').format('YYYY-MM-DD'),
  );
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const navigation = useTypedNavigation();

  const listData = useMemo<DailyRecipes['byId'][number][]>(() => {
    return Object.values(dailyRecipes.byId).filter(
      (i) => i.date === selectedDate,
    );
  }, [dailyRecipes.byId, selectedDate]);

  const RenderRecipes = ({ item }: { item: DailyRecipes['byId'][number] }) => {
    return (
      <View>
        {item.recipes.map((recipe) => {
          return (
            <View key={recipe.recipeId} style={styles.recipeItem}>
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
                <CachedImage
                  cacheKey={`recipeImage-${recipe.recipeId}`}
                  style={styles.recipeImage}
                  source={{ uri: recipe.recipeImageUri }}
                />
                <Text style={styles.recipeName}>{recipe.recipeName}</Text>
              </View>
              <View>
                <LinearGradientButton
                  disabled={recipe.isCreated}
                  width={40}
                  height={40}
                  onPress={() => {}}
                >
                  <Text
                    style={
                      recipe.isCreated
                        ? { color: 'white', fontSize: 16 }
                        : { color: 'white', fontSize: 16, fontWeight: 'bold' }
                    }
                  >
                    済
                  </Text>
                </LinearGradientButton>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading && <LoadingMask />}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('レシピ新規登録');
        }}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="silverware-fork-knife" size={30} color="white" />
        </CommonGradation>
      </TouchableOpacity>
      <Calendar
        horizontal={false}
        pagingEnabled={true}
        pastScrollRange={12}
        futureScrollRange={12}
        onVisibleMonthsChange={(months) => {
          console.log('now these months are visible', months);
        }}
        enableSwipeMonths={true}
        markedDates={{
          [dayjs().format('YYYY-MM-DD')]: {
            textColor: COMMON_COLOR_GREEN,
          },
          [selectedDate]: {
            selected: true,
            selectedColor: COMMON_COLOR_GREEN,
          },
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
          setSelectedDate(day.dateString);
        }}
      />
      <FlatList
        data={listData}
        renderItem={RenderRecipes}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  commonGradation: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  recipeName: {
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
