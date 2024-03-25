import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { recipeRepository } from '@src/interface/repositories/recipeRepository';
import Toast from 'react-native-toast-message';

type InsertShoppingRecipeArgs = {
  recipeName: string;
  recipeImage: string;
  materials: { masterId: string; quantity: number }[];
  descriptions: string[];
};

export const useRequestInsertRecipe = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async (args: InsertShoppingRecipeArgs) => {
    if (!user) {
      return Promise.reject(new Error('user is not defined'));
    }
    try {
      const data = await recipeRepository.insert({
        idToken,
        userId: user.uid,
        recipeName: args.recipeName,
        recipeImage: args.recipeImage,
      });

      if (data) {
        await recipeRepository.insertMaterials({
          idToken,
          recipeId: data.recipe_id,
          args: args.materials,
        });
        await recipeRepository.insertSteps({
          idToken,
          recipeId: data.recipe_id,
          args: args.descriptions.map((description) => ({
            description,
          })),
        });
      }

      return Promise.resolve(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'サーバーエラーが発生しました',
        text2: '時間をおいて再度お試しください',
      });
      return Promise.reject(error);
    }
  };
};
