import {
  InsertCustomMeatMasterDocument,
  DeleteCustomMeatAndStocksDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomMeatMasterArgs = {
  idToken: string | null;
  userId: string;
  meatName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customMeatMasterRepository = {
  insert: async ({
    idToken,
    userId,
    meatName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomMeatMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomMeatMasterDocument, {
      userId,
      meatName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_meat_master_one;
  },
  delete: async ({
    idToken,
    meatId,
  }: {
    idToken: string | null;
    meatId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(DeleteCustomMeatAndStocksDocument, {
      meatId,
    });
    return data.delete_custom_meat_master;
  },
};
