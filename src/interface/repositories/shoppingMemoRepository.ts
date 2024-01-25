import {
  GetShoppingMemosDocument,
  InsertShoppingMemoDocument,
  UpdateShoppingMemoDocument,
  DeleteShoppingMemoDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

export const shoppingMemoRepository = {
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetShoppingMemosDocument);
    return data;
  },
  insert: async ({
    idToken,
    masterId,
    userId,
    quantity,
  }: {
    idToken: string | null;
    masterId: string;
    userId: string;
    quantity: number;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertShoppingMemoDocument, {
      masterId,
      userId,
      quantity,
    });
    return data;
  },
  update: async ({
    idToken,
    shoppingMemoId,
    masterId,
    quantity,
  }: {
    idToken: string | null;
    shoppingMemoId: string;
    masterId: string;
    quantity: number;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateShoppingMemoDocument, {
      shoppingMemoId,
      masterId,
      quantity,
    });
    return data;
  },
  delete: async ({
    idToken,
    shoppingMemoId,
  }: {
    idToken: string | null;
    shoppingMemoId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(DeleteShoppingMemoDocument, {
      shoppingMemoId,
    });
    return data;
  },
};
