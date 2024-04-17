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
        dailyRecipe,
      }: {
        id: string;
        date: string;
        dailyRecipe: DailyRecipes['byId'][number]['dailyRecipes'][number];
      }) => {
        set(dailyRecipesState, (prev) => {
          const ids = prev.ids.includes(id) ? prev.ids : [...prev.ids, id];
          const byId = {
            ...prev.byId,
            [id]: {
              id,
              date,
              dailyRecipes: prev.byId[id]
                ? [...prev.byId[id].dailyRecipes, dailyRecipe]
                : [dailyRecipe],
            },
          };
          return {
            ids,
            byId,
          };
        });
      },
  );

  const updateDailyRecipe = useRecoilCallback(
    ({ set }) =>
      ({
        id,
        date,
        dailyRecipe,
      }: {
        id: string;
        date: string;
        dailyRecipe: DailyRecipes['byId'][number]['dailyRecipes'][number];
      }) => {
        set(dailyRecipesState, (prev) => {
          const ids = prev.ids.includes(id) ? prev.ids : [...prev.ids, id];

          const byId = {
            ...prev.byId,
            [id]: {
              id,
              date,
              dailyRecipes: prev.byId[id]
                ? prev.byId[id].dailyRecipes.map((i) =>
                    i.id === dailyRecipe.id ? dailyRecipe : i,
                  )
                : [dailyRecipe],
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
    updateDailyRecipe,
  };
};
