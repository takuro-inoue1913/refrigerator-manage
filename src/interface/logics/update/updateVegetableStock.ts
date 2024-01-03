import { UpdateVegetableStockDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type UpsertVegetableStockArgs = {
  idToken: string;
  userId: string;
  vegetableId: number;
  quantity: number;
};

export const updateVegetableStock = async ({
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
};
