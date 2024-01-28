import {
  GetShoppingMemosDocument,
  InsertShoppingMemoDocument,
  UpdateShoppingMemoDocument,
  UpdateShoppingMemoIsCheckedDocument,
  DeleteShoppingMemoDocument,
  BulkDeleteShoppingMemoDocument,
  DeleteShoppingMemoByMasterIdDocument,
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
    return data.insert_shopping_memo_one;
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
    return data.update_shopping_memo_by_pk;
  },
  updateIsChecked: async ({
    idToken,
    shoppingMemoId,
    isChecked,
  }: {
    idToken: string | null;
    shoppingMemoId: string;
    isChecked: boolean;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateShoppingMemoIsCheckedDocument, {
      shoppingMemoId,
      isChecked,
    });
    return data.update_shopping_memo_by_pk;
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
    return data.delete_shopping_memo_by_pk;
  },
  deleteByMasterId: async ({
    idToken,
    userId,
    masterId,
  }: {
    idToken: string | null;
    userId: string;
    masterId: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(DeleteShoppingMemoByMasterIdDocument, {
      userId,
      masterId,
    });
    return data.delete_shopping_memo;
  },
  bulkDelete: async ({
    idToken,
    shoppingMemoIds,
  }: {
    idToken: string | null;
    shoppingMemoIds: string[];
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(BulkDeleteShoppingMemoDocument, {
      shoppingMemoIds,
    });
    return data.delete_shopping_memo;
  },
};
