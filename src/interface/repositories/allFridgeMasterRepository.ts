import { GetAllFridgeMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

export const allFridgeMasterRepository = {
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetAllFridgeMasterDocument);
    return data;
  },
};
