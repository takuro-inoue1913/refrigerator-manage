import { InsertCustomProteinSourceMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertCustomProteinSourceMasterArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const customProteinSourceRepository = {
  insert: async ({
    idToken,
    userId,
    proteinSourceName,
    displayName,
    imageUri,
    defaultExpirationPeriod,
    unitId,
  }: InsertCustomProteinSourceMasterArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertCustomProteinSourceMasterDocument, {
      userId,
      proteinSourceName,
      displayName,
      imageUri,
      defaultExpirationPeriod,
      unitId,
    });
    return data.insert_custom_protein_source_master_one;
  },
};
