import dayjs from 'dayjs';
import {
  GetMeatMasterAndUnitAndStocksDocument,
  GetMeatStockByUserIdAndMeatIdDocument,
  InsertMeatStockDocument,
  UpdateMeatStockQuantityDocument,
  UpdateMeatStockDetailDocument,
  UpdateMeatStockIsFavoriteDocument,
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
  incrementalUnit: number;
  isFavorite?: boolean;
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
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  meatId: number;
  isFavorite: boolean;
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
    incrementalUnit,
    isFavorite,
  }: InsertMeatStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertMeatStockDocument, {
      object: {
        user_id: userId,
        meat_id: meatId,
        quantity,
        // デフォルト値
        memo: '',
        incremental_unit: incrementalUnit,
        // 賞味期限は 3日後 とする
        expiration_date: dayjs().add(3, 'day').format('YYYY-MM-DD'),
        is_favorite: isFavorite ?? false,
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
      // 在庫更新時には賞味期限を3日後に更新する
      expirationDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    });
    return data.update_meat_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    meatId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateMeatStockIsFavoriteDocument, {
      userId,
      meatId,
      isFavorite,
    });
    return data.update_meat_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    meatId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateMeatStockDetailDocument, {
      userId,
      meatId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
    });
    return data.update_meat_stocks?.returning[0];
  },
};
