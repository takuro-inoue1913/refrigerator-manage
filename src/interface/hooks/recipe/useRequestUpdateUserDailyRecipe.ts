import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import Toast from 'react-native-toast-message';
import { dailyRecipeRepository } from '@src/interface/repositories/dailyRecipeRepository';

type UpdateUserDailyRecipeArgs = {
  userDailyRecipeId: string;
  brunchType: string;
  recipeId: string;
  isCreated: boolean;
};

export const useRequestUpdateUserDailyRecipe = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async (args: UpdateUserDailyRecipeArgs) => {
    if (!user) {
      return Promise.reject(new Error('user is not defined'));
    }

    try {
      const data = await dailyRecipeRepository.updateDailyRecipe({
        idToken,
        userDailyRecipeId: args.userDailyRecipeId,
        brunchType: args.brunchType,
        recipeId: args.recipeId,
        isCreated: args.isCreated,
      });

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
