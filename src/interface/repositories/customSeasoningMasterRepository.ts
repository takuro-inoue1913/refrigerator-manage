import { InsertCustomSeasoningMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomSeasoningMasterArgs = {
  idToken: string | null;
  userId: string;
  seasoningName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customSeasoningMasterRepository = {
  insert: async ({
    idToken,
    userId,
    seasoningName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomSeasoningMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomSeasoningMasterDocument, {
      userId,
      seasoningName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_seasoning_master_one;
  },
};
