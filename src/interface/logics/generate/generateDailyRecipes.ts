import { GetUsersDailyRecipesInRangeQuery } from '@src/interface/__generated__/graphql';
import { BrunchType, DailyRecipes } from '@src/states/recipe';

const brunchOrder = {
  breakfast: 1,
  lunch: 2,
  dinner: 3,
  snack: 4,
};

export const generateDailyRecipes = (
  data: GetUsersDailyRecipesInRangeQuery,
): DailyRecipes => {
  const ids = data.user_daily.map((i) => i.user_daily_id);
  const _dailyRecipes: DailyRecipes['byId'] = {};

  data.user_daily.forEach((i) => {
    _dailyRecipes[i.user_daily_id] = {
      id: i.user_daily_id,
      date: i.date,
      recipes: i.user_daily_user_daily_recipes
        ? i.user_daily_user_daily_recipes
            .map((j) => ({
              recipeId: j.user_daily_recipes_recipes?.recipe_id ?? '',
              recipeName: j.user_daily_recipes_recipes?.recipe_name ?? '',
              recipeImageUri: j.user_daily_recipes_recipes?.recipe_image ?? '',
              brunchType: j.brunch_type as BrunchType,
              isCreated: j.is_created,
            }))
            .sort(
              (a, b) => brunchOrder[a.brunchType] - brunchOrder[b.brunchType],
            )
        : [],
    };
  });

  return {
    ids,
    byId: _dailyRecipes,
  };
};
