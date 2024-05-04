import React, { FC, useMemo } from 'react';
import {
  // Alert,
  // Pressable,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
} from 'react-native';
// import AnimatedCheckbox from '@src/components/common/AnimatedCheckbox';
// import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
// import CachedImage from 'expo-cached-image';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { recipesState } from '@src/states/recipe';
import { RootStackParamList } from '@src/types';
import { useRecoilValue } from 'recoil';
import { fridgeMasterState } from '@src/states/fridge';

type Props = {
  route: RouteProp<RootStackParamList, '追加する材料'>;
};

type MissingMaterials = {
  id: string;
  name: string;
  missingQuantity: number;
}[];

export const AddMissingMaterialsScreen: FC<Props> = ({ route }) => {
  const recipes = useRecoilValue(recipesState);
  const fridgeMaster = useRecoilValue(fridgeMasterState);
  const recipe = recipes.byId[route.params.recipeId];

  const missingMaterials: MissingMaterials = useMemo(() => {
    // material の masterId が fridgeMaster と一致するものであり、かつ、material の quantity が fridgeMaster の quantity よりも多いものを抽出し、足らない分を計算する
    return recipe.materials
      .filter((material) => {
        const fridgeItem = fridgeMaster.find((f) => f.id === material.masterId);
        return fridgeItem && fridgeItem.quantity < material.quantity;
      })
      .map((material) => {
        const fridgeItem = fridgeMaster.find((f) => f.id === material.masterId);
        return {
          id: fridgeItem!.id,
          name: fridgeItem!.name,
          missingQuantity: material.quantity - fridgeItem!.quantity,
        };
      });
  }, [fridgeMaster, recipe.materials]);

  console.log(missingMaterials);
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
