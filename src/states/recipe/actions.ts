import { DailyRecipes, dailyRecipesState } from '@src/states/recipe/state';
import { useRecoilCallback } from 'recoil';

export const useRecipesActions = () => {
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
    addDailyRecipe,
  };
};
