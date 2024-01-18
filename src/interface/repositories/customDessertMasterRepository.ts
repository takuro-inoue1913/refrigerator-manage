import {
  InsertCustomDessertMasterDocument,
  DeleteCustomDessertAndStocksDocument,
} from '@src/interface/__generated__/graphql';
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

export const customDessertMasterRepository = {
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
  delete: async ({
    idToken,
    dessertId,
  }: {
    idToken: string | null;
    dessertId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(DeleteCustomDessertAndStocksDocument, {
      dessertId,
    });
    return data.delete_custom_dessert_master;
  },
};
