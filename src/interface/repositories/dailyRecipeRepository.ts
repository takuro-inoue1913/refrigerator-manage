import {
  GetUsersDailyRecipesDocument,
  GetUsersDailyRecipesInRangeDocument,
  CreateUserDailyDocument,
  CreateUserDailyRecipeDocument,
  UpdateUserDailyRecipeDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

export const dailyRecipeRepository = {
  getInRange: async ({
    idToken,
    startDate,
    endDate,
  }: {
    idToken: string | null;
    startDate: string;
    endDate: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetUsersDailyRecipesInRangeDocument, {
      startDate,
      endDate,
    });
    return data;
  },
  byDate: async ({
    idToken,
    date,
  }: {
    idToken: string | null;
    date: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetUsersDailyRecipesDocument, {
      date,
    });
    return data;
  },
  insertDaily: async ({
    idToken,
    date,
    userId,
  }: {
    idToken: string | null;
    date: string;
    userId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(CreateUserDailyDocument, {
      date,
      userId,
    });
    return data.insert_user_daily_one;
  },
  insertDailyRecipe: async ({
    idToken,
    userDailyId,
    brunchType,
    recipeId,
    isCreated,
  }: {
    idToken: string | null;
    userDailyId: string;
    brunchType: string;
    recipeId: string;
    isCreated: boolean;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(CreateUserDailyRecipeDocument, {
      userDailyId,
      brunchType,
      recipeId,
      isCreated,
    });
    return data.insert_user_daily_recipes_one;
  },
  updateDailyRecipe: async ({
    idToken,
    userDailyRecipeId,
    brunchType,
    isCreated,
    recipeId,
  }: {
    idToken: string | null;
    userDailyRecipeId: string;
    brunchType: string;
    isCreated: boolean;
    recipeId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateUserDailyRecipeDocument, {
      userDailyRecipeId: userDailyRecipeId,
      brunchType: brunchType,
      isCreated: isCreated,
      recipeId: recipeId,
    });
    return data.update_user_daily_recipes_by_pk;
  },
};
