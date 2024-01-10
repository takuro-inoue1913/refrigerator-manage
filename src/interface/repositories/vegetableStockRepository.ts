import dayjs from 'dayjs';
import {
  GetVegetableMasterAndUnitAndStocksDocument,
  GetCustomVegetableMasterAndUnitAndStocksDocument,
  GetVegetableStockByUserIdAndVegetableIdDocument,
  InsertVegetableStockDocument,
  UpdateVegetableStockDetailDocument,
  UpdateVegetableStockQuantityDocument,
  UpdateVegetableStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneVegetableStockArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
};

type InsertVegetableStockArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateVegetableStockArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  isFavorite: boolean;
};

export const vegetableStockRepository = {
  getOne: async ({
    idToken,
    userId,
    vegetableId,
  }: GetOneVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetVegetableStockByUserIdAndVegetableIdDocument,
      {
        userId,
        vegetableId,
      },
    );

    return data.vegetable_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const vegetableMasterData = await client.request(
      GetVegetableMasterAndUnitAndStocksDocument,
    );

    const customVegetableMasterData = await client.request(
      GetCustomVegetableMasterAndUnitAndStocksDocument,
    );

    return {
      vegetableMasterData,
      customVegetableMasterData,
    };
  },
  insert: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertVegetableStockDocument, {
      object: {
        user_id: userId,
        vegetable_id: vegetableId,
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
    return data.insert_vegetable_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockQuantityDocument, {
      userId,
      vegetableId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_vegetable_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    vegetableId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockIsFavoriteDocument, {
      userId,
      vegetableId,
      isFavorite,
    });
    return data.update_vegetable_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockDetailDocument, {
      userId,
      vegetableId,
      quantity,
      expirationDate,
      incrementalUnit,
      memo,
    });
    return data.update_vegetable_stocks?.returning[0];
  },
};
