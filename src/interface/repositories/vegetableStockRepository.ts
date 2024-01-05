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
  }: InsertVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertVegetableStockDocument, {
      object: {
        user_id: userId,
        vegetable_id: vegetableId,
        quantity,
        // デフォルト値
        memo: '',
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
    });
    return data.update_vegetable_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
    expirationDate,
    memo,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockDetailDocument, {
      userId,
      vegetableId,
      quantity,
      expirationDate,
      memo,
    });
    return data.update_vegetable_stocks?.returning[0];
  },
};
