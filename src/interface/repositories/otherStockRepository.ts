import dayjs from 'dayjs';
import {
  GetAllOtherMasterAndUnitAndStocksDocument,
  GetOtherStockByUserIdAndOtherIdDocument,
  InsertOtherStockDocument,
  UpdateOtherStockQuantityDocument,
  UpdateOtherStockDetailDocument,
  UpdateOtherStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneOtherStockArgs = {
  idToken: string | null;
  userId: string;
  otherId: string;
};

type InsertOtherStockArgs = {
  idToken: string | null;
  userId: string;
  otherId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateOtherStockArgs = {
  idToken: string | null;
  userId: string;
  otherId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  otherId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  otherId: string;
  isFavorite: boolean;
};

export const otherStockRepository = {
  getOne: async ({ idToken, userId, otherId }: GetOneOtherStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetOtherStockByUserIdAndOtherIdDocument, {
      userId,
      otherId,
    });

    return data.other_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllOtherMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    otherId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertOtherStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertOtherStockDocument, {
      object: {
        user_id: userId,
        other_id: otherId,
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
    return data.insert_other_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    otherId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateOtherStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateOtherStockQuantityDocument, {
      userId,
      otherId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_other_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    otherId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateOtherStockIsFavoriteDocument, {
      userId,
      otherId,
      isFavorite,
    });
    return data.update_other_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    otherId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateOtherStockDetailDocument, {
      userId,
      otherId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_other_stocks?.returning[0];
  },
};
