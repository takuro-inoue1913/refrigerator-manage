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
import { DailyRecipes, Recipes } from '@src/states/recipe';
import CachedImage from 'expo-cached-image';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import {
  SettingDailyRecipeModal,
  SettingDailyRecipeModalDropdownData,
  SubmitValues,
} from '@src/components/RecipeScreen/SettingDailyRecipeModal';
import { useRequestGetAllRecipes } from '@src/interface/hooks/recipe/useRequestGetAllRecipes';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';

export const RecipeScreen = () => {
  const { isFetching: isFetchingGetUsersDailyRecipes, dailyRecipes } =
    useRequestGetUsersDailyRecipes(
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD'),
    );
  useRequestGetAllFridgeMaster();
  const { isFetching: isFetchingGetAllRecipes, recipes } =
    useRequestGetAllRecipes();
  const navigation = useTypedNavigation();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    Recipes['byId'][number] | null
  >(null);

  const dailyRecipesData = useMemo<DailyRecipes['byId'][number][]>(() => {
    return Object.values(dailyRecipes.byId).filter(
      (i) => i.date === selectedDate,
    );
  }, [dailyRecipes.byId, selectedDate]);

  const recipeMasterData = useMemo<
    SettingDailyRecipeModalDropdownData[]
  >(() => {
    return recipes.ids.map((i) => ({
      label: recipes.byId[i].name,
      value: i,
      searchKey: recipes.byId[i].name,
    }));
  }, [recipes]);

  const handleChangeDropdownValue = (
    data: SettingDailyRecipeModalDropdownData,
  ) => {
    setSelectedRecipe(recipes.byId[data.value]);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    selectedRecipe && setSelectedRecipe(null);
  };

  const handleSubmitModal = (values: SubmitValues) => {
    console.log(values);
  };

  const NewDailyRecipe = () => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.newDailyRecipeWrapper}>
          <Text style={styles.textStyle}>献立を設定する</Text>
          <Icon name="plus" size={30} color="gray" />
        </View>
      </TouchableOpacity>
    );
  };

  const RenderRecipes = ({ item }: { item: DailyRecipes['byId'][number] }) => {
    return (
      <View>
        {item.recipes.map((recipe) => {
          return (
            <TouchableOpacity key={recipe.recipeId} onPress={() => {}}>
              <View style={styles.recipeItem}>
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
                  <Text style={styles.textStyle}>{recipe.recipeName}</Text>
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
            </TouchableOpacity>
          );
        })}
        <NewDailyRecipe />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isFetchingGetAllRecipes ||
        (isFetchingGetUsersDailyRecipes && <LoadingMask />)}
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
          setSelectedDate(day.dateString);
        }}
      />
      <FlatList
        data={dailyRecipesData}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={RenderRecipes}
        ListEmptyComponent={NewDailyRecipe}
        keyExtractor={(item) => item.id}
      />
      <SettingDailyRecipeModal
        visible={modalVisible}
        selectRecipe={selectedRecipe}
        targetDayStr={dayjs(selectedDate).format('MM月DD日')}
        dropdownData={recipeMasterData}
        mode="add"
        onChangeDropdownValue={handleChangeDropdownValue}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
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
    zIndex: 100,
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
  newDailyRecipeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#e1e4e8',
    borderStyle: 'dotted',
  },
});
