import dayjs from 'dayjs';
import {
  GetAllDessertMasterAndUnitAndStocksDocument,
  GetDessertStockByUserIdAndDessertIdDocument,
  InsertDessertStockDocument,
  UpdateDessertStockQuantityDocument,
  UpdateDessertStockDetailDocument,
  UpdateDessertStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneDessertStockArgs = {
  idToken: string | null;
  userId: string;
  dessertId: string;
};

type InsertDessertStockArgs = {
  idToken: string | null;
  userId: string;
  dessertId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateDessertStockArgs = {
  idToken: string | null;
  userId: string;
  dessertId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  dessertId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  dessertId: string;
  isFavorite: boolean;
};

export const dessertStockRepository = {
  getOne: async ({ idToken, userId, dessertId }: GetOneDessertStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetDessertStockByUserIdAndDessertIdDocument,
      {
        userId,
        dessertId,
      },
    );

    return data.dessert_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllDessertMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    dessertId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertDessertStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertDessertStockDocument, {
      object: {
        user_id: userId,
        dessert_id: dessertId,
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
    return data.insert_dessert_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    dessertId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateDessertStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateDessertStockQuantityDocument, {
      userId,
      dessertId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_dessert_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    dessertId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateDessertStockIsFavoriteDocument, {
      userId,
      dessertId,
      isFavorite,
    });
    return data.update_dessert_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    dessertId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateDessertStockDetailDocument, {
      userId,
      dessertId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_dessert_stocks?.returning[0];
  },
};
