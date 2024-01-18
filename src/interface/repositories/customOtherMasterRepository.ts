import {
  InsertCustomOtherMasterDocument,
  DeleteCustomOtherAndStocksDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomOtherMasterArgs = {
  idToken: string | null;
  userId: string;
  otherName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customOtherMasterRepository = {
  insert: async ({
    idToken,
    userId,
    otherName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomOtherMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomOtherMasterDocument, {
      userId,
      otherName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_other_master_one;
  },
  delete: async ({
    idToken,
    otherId,
  }: {
    idToken: string | null;
    otherId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(DeleteCustomOtherAndStocksDocument, {
      otherId,
    });
    return data.delete_custom_other_master;
  },
};
