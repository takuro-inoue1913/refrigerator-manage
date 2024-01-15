import dayjs from 'dayjs';
import {
  GetAllStapleFoodMasterAndUnitAndStocksDocument,
  GetStapleFoodStockByUserIdAndStapleFoodIdDocument,
  InsertStapleFoodStockDocument,
  UpdateStapleFoodStockQuantityDocument,
  UpdateStapleFoodStockDetailDocument,
  UpdateStapleFoodStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneStapleFoodStockArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodId: string;
};

type InsertStapleFoodStockArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateStapleFoodStockArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  stapleFoodId: string;
  isFavorite: boolean;
};

export const stapleFoodStockRepository = {
  getOne: async ({
    idToken,
    userId,
    stapleFoodId,
  }: GetOneStapleFoodStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetStapleFoodStockByUserIdAndStapleFoodIdDocument,
      {
        userId,
        stapleFoodId,
      },
    );

    return data.staple_food_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllStapleFoodMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    stapleFoodId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertStapleFoodStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertStapleFoodStockDocument, {
      object: {
        user_id: userId,
        staple_food_id: stapleFoodId,
        quantity,
        // デフォルト値
        memo: '',
        incremental_unit: incrementalUnit,
        expiration_date: dayjs()
          .add(defaultExpirationPeriod, 'day')
          .format('YYYY-MM-DD'),
        is_favorite: isFavorite ?? false,
      },
    });
    return data.insert_staple_food_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    stapleFoodId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateStapleFoodStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateStapleFoodStockQuantityDocument, {
      userId,
      stapleFoodId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_staple_food_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    stapleFoodId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateStapleFoodStockIsFavoriteDocument, {
      userId,
      stapleFoodId,
      isFavorite,
    });
    return data.update_staple_food_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    stapleFoodId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateStapleFoodStockDetailDocument, {
      userId,
      stapleFoodId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_staple_food_stocks?.returning[0];
  },
};
