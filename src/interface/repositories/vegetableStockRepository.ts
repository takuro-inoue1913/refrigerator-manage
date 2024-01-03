import {
  GetVegetableMasterAndUnitAndStocksDocument,
  GetVegetableStockByUserIdAndVegetableIdDocument,
  InsertVegetableStockDocument,
  UpdateVegetableStockDocument,
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

type UpsertVegetableStockArgs = {
  idToken: string | null;
  userId: string;
  vegetableId: number;
  quantity: number;
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
      },
    });
    return data.insert_vegetable_stocks_one;
  },
  update: async ({
    idToken,
    userId,
    vegetableId,
    quantity,
  }: UpsertVegetableStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateVegetableStockDocument, {
      userId,
      vegetableId,
      quantity,
    });
    return data.update_vegetable_stocks?.returning[0];
  },
};
