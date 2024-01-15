import dayjs from 'dayjs';
import {
  GetAllSeasoningMasterAndUnitAndStocksDocument,
  GetSeasoningStockByUserIdAndSeasoningIdDocument,
  InsertSeasoningStockDocument,
  UpdateSeasoningStockQuantityDocument,
  UpdateSeasoningStockDetailDocument,
  UpdateSeasoningStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneSeasoningStockArgs = {
  idToken: string | null;
  userId: string;
  seasoningId: string;
};

type InsertSeasoningStockArgs = {
  idToken: string | null;
  userId: string;
  seasoningId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateSeasoningStockArgs = {
  idToken: string | null;
  userId: string;
  seasoningId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  seasoningId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  seasoningId: string;
  isFavorite: boolean;
};

export const seasoningStockRepository = {
  getOne: async ({
    idToken,
    userId,
    seasoningId,
  }: GetOneSeasoningStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetSeasoningStockByUserIdAndSeasoningIdDocument,
      {
        userId,
        seasoningId,
      },
    );

    return data.seasoning_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllSeasoningMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    seasoningId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertSeasoningStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertSeasoningStockDocument, {
      object: {
        user_id: userId,
        seasoning_id: seasoningId,
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
    return data.insert_seasoning_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    seasoningId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateSeasoningStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSeasoningStockQuantityDocument, {
      userId,
      seasoningId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_seasoning_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    seasoningId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSeasoningStockIsFavoriteDocument, {
      userId,
      seasoningId,
      isFavorite,
    });
    return data.update_seasoning_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    seasoningId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateSeasoningStockDetailDocument, {
      userId,
      seasoningId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_seasoning_stocks?.returning[0];
  },
};
