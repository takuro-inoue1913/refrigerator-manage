import {
  GetUsersDailyRecipesDocument,
  GetUsersDailyRecipesInRangeDocument,
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
};
