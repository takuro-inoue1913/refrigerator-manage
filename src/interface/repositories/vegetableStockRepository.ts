import dayjs from 'dayjs';
import {
  GetVegetableMasterAndUnitAndStocksDocument,
  GetVegetableStockByUserIdAndVegetableIdDocument,
  InsertVegetableStockDocument,
  UpdateVegetableStockDetailDocument,
  UpdateVegetableStockQuantityDocument,
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
};

type UpdateVegetableStockArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  quantity: number;
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

    const data = await client.request(
      GetVegetableMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
    incrementalUnit,
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
        // 野菜の賞味期限の初期値は一週間後とする
        expiration_date: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      },
    });
    return data.insert_vegetable_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
  }: UpdateVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockQuantityDocument, {
      userId,
      vegetableId,
      quantity,
      // 在庫更新時には賞味期限を一週間後に更新する
      expirationDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
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
