import {
  DailyRecipes,
  Recipes,
  dailyRecipesState,
  recipesState,
} from '@src/states/recipe/state';
import { useRecoilCallback } from 'recoil';

export const useRecipesActions = () => {
  const addRecipe = useRecoilCallback(
    ({ set }) =>
      ({
        id,
        name,
        imageUri,
        materials,
        descriptions,
      }: Recipes['byId'][number]) => {
        set(recipesState, (prev) => {
          const ids = prev.ids.includes(id) ? prev.ids : [...prev.ids, id];
          const byId = {
            ...prev.byId,
            [id]: {
              id,
              name,
              imageUri,
              materials,
              descriptions,
            },
          };
          return {
            ids,
            byId,
          };
        });
      },
  );

  const addDailyRecipe = useRecoilCallback(
    ({ set }) =>
      ({
        id,
        date,
        recipe,
      }: {
        id: string;
        date: string;
        recipe: DailyRecipes['byId'][number]['recipes'][number];
      }) => {
        set(dailyRecipesState, (prev) => {
          const ids = prev.ids.includes(id) ? prev.ids : [...prev.ids, id];
          const byId = {
            ...prev.byId,
            [id]: {
              id,
              date,
              recipes: prev.byId[id]
                ? [...prev.byId[id].recipes, recipe]
                : [recipe],
            },
          };
          return {
            ids,
            byId,
          };
        });
      },
  );

  return {
    addRecipe,
    addDailyRecipe,
  };
};
