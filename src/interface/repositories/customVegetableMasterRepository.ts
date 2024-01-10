import { InsertCustomVegetableMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomVegetableMasterArgs = {
  idToken: string | null;
  userId: string;
  vegetableName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customVegetableMasterRepository = {
  insert: async ({
    idToken,
    userId,
    vegetableName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomVegetableMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomVegetableMasterDocument, {
      userId,
      vegetableName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_vegetable_master_one;
  },
};
