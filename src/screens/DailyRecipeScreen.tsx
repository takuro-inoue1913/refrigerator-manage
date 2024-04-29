import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { CommonGradation } from '@src/components/common/CommonGradation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useRequestGetUsersDailyRecipes } from '@src/interface/hooks/recipe/useRequestGetUsersDailyRecipes';
import { LoadingMask } from '@src/components/common/LoadingMask';
import { BrunchType, DailyRecipes, Recipes } from '@src/states/recipe';
import CachedImage from 'expo-cached-image';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import {
  SettingDailyRecipeModal,
  SettingDailyRecipeModalDropdownData,
  SubmitValues,
} from '@src/components/DailyRecipeScreen/SettingDailyRecipeModal';
import { useRequestGetAllRecipes } from '@src/interface/hooks/recipe/useRequestGetAllRecipes';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';
import { useRequestInsertUserDailyRecipe } from '@src/interface/hooks/recipe/useRequestInsertUserDailyRecipe';
import { useRecipesActions } from '@src/states/recipe/actions';
import { useRequestUpdateUserDailyRecipe } from '@src/interface/hooks/recipe/useRequestUpdateUserDailyRecipe';
import { useRequestDeleteUserDailyRecipe } from '@src/interface/hooks/recipe/useRequestDeleteUserDailyRecipe';
import { useIsFocused } from '@react-navigation/native';

export const DailyRecipeScreen = () => {
  const isFocused = useIsFocused();
  const { isFetching: isFetchingGetUsersDailyRecipes, dailyRecipes } =
    useRequestGetUsersDailyRecipes(
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD'),
    );
  const { refetch: refetchGetAllFridgeMaster } = useRequestGetAllFridgeMaster();
  const {
    refetch: refetchGetAllRecipes,
    isFetching: isFetchingGetAllRecipes,
    recipes,
  } = useRequestGetAllRecipes();
  const { addDailyRecipe, updateDailyRecipe, deleteDailyRecipe } =
    useRecipesActions();
  const requestInsertUserDailyRecipe = useRequestInsertUserDailyRecipe();
  const requestUpdateUserDailyRecipe = useRequestUpdateUserDailyRecipe();
  const requestDeleteUserDailyRecipe = useRequestDeleteUserDailyRecipe();
  const navigation = useTypedNavigation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    Recipes['byId'][number] | null
  >(null);
  const [selectedDailyRecipeId, setSelectedDailyRecipeId] = useState<
    string | null
  >(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const dailyRecipesData = useMemo<DailyRecipes['byId'][number][]>(() => {
    return Object.values(dailyRecipes.byId).filter(
      (i) => i.date === selectedDate,
    );
  }, [dailyRecipes.byId, selectedDate]);

  const getTargetDailyRecipe = useCallback(
    (recipeId: string) => {
      const targetDailyRecipe = dailyRecipesData.find((i) =>
        i.dailyRecipes.find((j) => j.recipeId === recipeId),
      );

      const targetRecipe = targetDailyRecipe?.dailyRecipes.find(
        (i) => i.recipeId === recipeId,
      );

      if (!targetDailyRecipe || !targetRecipe) {
        return null;
      }

      return {
        dailyRecipeId: targetDailyRecipe!.id,
        ...targetRecipe,
      };
    },
    [dailyRecipesData],
  );

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

  const handleClickDailyRecipe = (
    item: DailyRecipes['byId'][number],
    index: number,
  ) => {
    const recipe = recipes.byId[item.dailyRecipes[index].recipeId];
    setSelectedRecipe(recipe);
    setSelectedDailyRecipeId(item.dailyRecipes[index].id);
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    selectedRecipe && setSelectedRecipe(null);
    selectedDailyRecipeId && setSelectedDailyRecipeId(null);
  };

  const handleSubmitModal = useCallback(
    async (values: SubmitValues) => {
      if (!selectedRecipe) {
        return;
      }

      const addDailyRecipeFn = async () => {
        setModalVisible(false);
        setIsProcessing(true);
        const result = await requestInsertUserDailyRecipe({
          date: selectedDate,
          brunchType: values.brunchType,
          recipeId: values.recipeId,
          isCreated: values.isCreated,
        });
        if (!result) {
          setIsProcessing(false);
          throw new Error('addDailyRecipe failed');
        }
        addDailyRecipe({
          id: result.user_daily_id,
          date: selectedDate,
          dailyRecipe: {
            id: result.user_daily_recipes_id,
            recipeId: values.recipeId,
            recipeName: selectedRecipe.name,
            recipeImageUri: selectedRecipe.imageUri,
            brunchType: values.brunchType as BrunchType,
            isCreated: values.isCreated,
          },
        });
        setIsProcessing(false);
        setSelectedRecipe(null);
        setSelectedDailyRecipeId(null);
      };

      const updateDailyRecipeFn = async () => {
        setModalVisible(false);
        setIsProcessing(true);
        if (!selectedDailyRecipeId) {
          throw new Error('selectedDailyRecipeId is not found');
        }
        const result = await requestUpdateUserDailyRecipe({
          userDailyRecipeId: selectedDailyRecipeId,
          brunchType: values.brunchType,
          recipeId: values.recipeId,
          isCreated: values.isCreated,
        });
        if (!result) {
          setIsProcessing(false);
          throw new Error('updateDailyRecipe failed');
        }
        updateDailyRecipe({
          id: result.user_daily_id,
          date: selectedDate,
          dailyRecipe: {
            id: result.user_daily_recipes_id,
            recipeId: values.recipeId,
            recipeName: selectedRecipe.name,
            recipeImageUri: selectedRecipe.imageUri,
            brunchType: values.brunchType as BrunchType,
            isCreated: values.isCreated,
          },
        });
        setSelectedRecipe(null);
        setIsProcessing(false);
        setSelectedDailyRecipeId(null);
      };

      if (modalMode === 'add') {
        Alert.alert(
          '足らない食材を買い物メモに追加しますか？',
          '追加する場合、買い物メモ追加候補画面に遷移します。',
          [
            {
              text: '追加する',
              onPress: () => {
                // 追加するロジックを書く;
                // navigation.navigate('買い物メモ追加候補', {
                //   screen: '買い物メモ追加候補',
                //   params: {
                //     recipeId: selectedRecipe.id,
                //     recipeName: selectedRecipe.name,
                //     recipeImageUri: selectedRecipe.imageUri,
                //     brunchType: values.brunchType,
                //   },
                // });
                // addDailyRecipeFn();
              },
            },
            {
              text: '追加しないで登録',
              onPress: () => addDailyRecipeFn(),
            },
            {
              text: 'キャンセル',
              style: 'destructive',
              onPress: () => {
                setIsProcessing(false);
              },
            },
          ],
        );
      } else {
        updateDailyRecipeFn();
      }
    },
    [
      selectedRecipe,
      selectedDate,
      modalMode,
      selectedDailyRecipeId,
      requestInsertUserDailyRecipe,
      addDailyRecipe,
      requestUpdateUserDailyRecipe,
      updateDailyRecipe,
    ],
  );

  const handleDeleteDailyRecipe = useCallback(async () => {
    if (!selectedDailyRecipeId) {
      return;
    }

    const deleteDailyRecipeFn = async () => {
      setModalVisible(false);
      setIsProcessing(true);
      const result = await requestDeleteUserDailyRecipe({
        userDailyRecipeId: selectedDailyRecipeId,
      });
      if (!result) {
        setIsProcessing(false);
        throw new Error('deleteDailyRecipe failed');
      }
      deleteDailyRecipe({
        id: result.user_daily_id,
        date: selectedDate,
        dailyRecipeId: selectedDailyRecipeId,
      });
      setIsProcessing(false);
    };
    Alert.alert('削除しますか？', '', [
      {
        text: '削除する',
        onPress: deleteDailyRecipeFn,
      },
      {
        text: 'キャンセル',
        style: 'destructive',
        onPress: () => {
          setIsProcessing(false);
        },
      },
    ]);
  }, [
    selectedDailyRecipeId,
    selectedDate,
    requestDeleteUserDailyRecipe,
    deleteDailyRecipe,
  ]);

  const NewDailyRecipe = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalMode('add');
          setModalVisible(true);
        }}
      >
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
        {item.dailyRecipes.map((recipe, i) => {
          return (
            <TouchableOpacity
              key={`${item.id}-${i}`}
              onPress={() => {
                handleClickDailyRecipe(item, i);
              }}
            >
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
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      refetchGetAllFridgeMaster();
      refetchGetAllRecipes();
    }
  }, [isFocused, refetchGetAllFridgeMaster, refetchGetAllRecipes]);

  return (
    <View style={styles.container}>
      {(isFetchingGetAllRecipes ||
        isFetchingGetUsersDailyRecipes ||
        isProcessing) && <LoadingMask />}
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
      <ScrollView>
        <View style={{ paddingBottom: 80 }}>
          {dailyRecipesData.map((item) => (
            <RenderRecipes key={item.id} item={item} />
          ))}
          <NewDailyRecipe />
        </View>
      </ScrollView>
      <SettingDailyRecipeModal
        visible={modalVisible}
        selectRecipe={selectedRecipe}
        targetDayStr={dayjs(selectedDate).format('MM月DD日')}
        dropdownData={recipeMasterData}
        mode={modalMode}
        brunchType={
          selectedRecipe
            ? getTargetDailyRecipe(selectedRecipe.id)?.brunchType
            : 'breakfast'
        }
        isCreated={
          selectedRecipe
            ? getTargetDailyRecipe(selectedRecipe.id)?.isCreated
            : false
        }
        onChangeDropdownValue={handleChangeDropdownValue}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        onDelete={handleDeleteDailyRecipe}
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
