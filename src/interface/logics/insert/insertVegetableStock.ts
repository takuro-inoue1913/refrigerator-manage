import { InsertVegetableStockDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type InsertVegetableStockArgs = {
  idToken: string;
  userId: string;
  vegetableId: number;
  quantity: number;
};

export const insertVegetableStock = async ({
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
};
