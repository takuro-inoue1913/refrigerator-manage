import { InsertCustomStapleFoodMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomStapleFoodMasterArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customStapleFoodMasterRepository = {
  insert: async ({
    idToken,
    userId,
    stapleFoodName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomStapleFoodMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomStapleFoodMasterDocument, {
      userId,
      stapleFoodName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_staple_food_master_one;
  },
};
