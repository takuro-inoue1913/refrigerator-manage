import { GetUnitMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetAllUnitArg = {
  idToken: string | null;
};

export const unitRepository = {
  getAll: async ({ idToken }: GetAllUnitArg) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetUnitMasterDocument);
    return data.unit_master;
  },
};
