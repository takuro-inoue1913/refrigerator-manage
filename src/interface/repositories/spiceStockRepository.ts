import dayjs from 'dayjs';
import {
  GetAllSpiceMasterAndUnitAndStocksDocument,
  GetSpiceStockByUserIdAndSpiceIdDocument,
  InsertSpiceStockDocument,
  UpdateSpiceStockQuantityDocument,
  UpdateSpiceStockDetailDocument,
  UpdateSpiceStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneSpiceStockArgs = {
  idToken: string | null;
  userId: string;
  spiceId: string;
};

type InsertSpiceStockArgs = {
  idToken: string | null;
  userId: string;
  spiceId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateSpiceStockArgs = {
  idToken: string | null;
  userId: string;
  spiceId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  spiceId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  spiceId: string;
  isFavorite: boolean;
};

export const spiceStockRepository = {
  getOne: async ({ idToken, userId, spiceId }: GetOneSpiceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetSpiceStockByUserIdAndSpiceIdDocument, {
      userId,
      spiceId,
    });

    return data.spice_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllSpiceMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    spiceId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertSpiceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertSpiceStockDocument, {
      object: {
        user_id: userId,
        spice_id: spiceId,
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
    return data.insert_spice_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    spiceId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateSpiceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSpiceStockQuantityDocument, {
      userId,
      spiceId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_spice_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    spiceId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSpiceStockIsFavoriteDocument, {
      userId,
      spiceId,
      isFavorite,
    });
    return data.update_spice_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    spiceId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSpiceStockDetailDocument, {
      userId,
      spiceId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_spice_stocks?.returning[0];
  },
};
