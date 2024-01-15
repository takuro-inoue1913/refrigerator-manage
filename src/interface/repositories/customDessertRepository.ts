import { InsertCustomDessertMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomDessertMasterArgs = {
  idToken: string | null;
  userId: string;
  dessertName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customDessertRepository = {
  insert: async ({
    idToken,
    userId,
    dessertName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomDessertMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomDessertMasterDocument, {
      userId,
      dessertName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_dessert_master_one;
  },
};
