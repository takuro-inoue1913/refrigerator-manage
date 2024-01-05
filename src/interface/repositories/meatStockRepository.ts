import {
  GetMeatMasterAndUnitAndStocksDocument,
  GetMeatStockByUserIdAndMeatIdDocument,
  InsertMeatStockDocument,
  UpdateMeatStockQuantityDocument,
  UpdateMeatStockDetailDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneMeatStockArgs = {
  idToken: string | null;
  userId: string;
  meatId: number;
};

type InsertMeatStockArgs = {
  idToken: string | null;
  userId: string;
  meatId: number;
  quantity: number;
};

type UpdateMeatStockArgs = {
  idToken: string | null;
  userId: string;
  meatId: number;
  quantity: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  meatId: number;
  quantity: number;
  expirationDate: string;
  memo: string;
};

export const meatStockRepository = {
  getOne: async ({ idToken, userId, meatId }: GetOneMeatStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetMeatStockByUserIdAndMeatIdDocument, {
      userId,
      meatId,
    });

    return data.meat_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetMeatMasterAndUnitAndStocksDocument);

    return data;
  },
  insert: async ({
    idToken,
    userId,
    meatId,
    quantity,
  }: InsertMeatStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertMeatStockDocument, {
      object: {
        user_id: userId,
        meat_id: meatId,
        quantity,
        // デフォルト値
        memo: '',
      },
    });
    return data.insert_meat_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    meatId,
    quantity,
  }: UpdateMeatStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateMeatStockQuantityDocument, {
      userId,
      meatId,
      quantity,
    });
    return data.update_meat_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    meatId,
    quantity,
    expirationDate,
    memo,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateMeatStockDetailDocument, {
      userId,
      meatId,
      quantity,
      expirationDate,
      memo,
    });
    return data.update_meat_stocks?.returning[0];
  },
};
