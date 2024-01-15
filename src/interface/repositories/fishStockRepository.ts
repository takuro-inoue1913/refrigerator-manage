import dayjs from 'dayjs';
import {
  GetAllFishMasterAndUnitAndStocksDocument,
  GetFishStockByUserIdAndFishIdDocument,
  InsertFishStockDocument,
  UpdateFishStockQuantityDocument,
  UpdateFishStockDetailDocument,
  UpdateFishStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneFishStockArgs = {
  idToken: string | null;
  userId: string;
  fishId: string;
};

type InsertFishStockArgs = {
  idToken: string | null;
  userId: string;
  fishId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateFishStockArgs = {
  idToken: string | null;
  userId: string;
  fishId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  fishId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  fishId: string;
  isFavorite: boolean;
};

export const fishStockRepository = {
  getOne: async ({ idToken, userId, fishId }: GetOneFishStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetFishStockByUserIdAndFishIdDocument, {
      userId,
      fishId,
    });

    return data.fish_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetAllFishMasterAndUnitAndStocksDocument);

    return data;
  },
  insert: async ({
    idToken,
    userId,
    fishId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertFishStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertFishStockDocument, {
      object: {
        user_id: userId,
        fish_id: fishId,
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
    return data.insert_fish_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    fishId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateFishStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateFishStockQuantityDocument, {
      userId,
      fishId,
      quantity,
      expirationDate: dayjs()
        .add(defaultExpirationPeriod, 'day')
        .format('YYYY-MM-DD'),
    });
    return data.update_fish_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    fishId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateFishStockIsFavoriteDocument, {
      userId,
      fishId,
      isFavorite,
    });
    return data.update_fish_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    fishId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateFishStockDetailDocument, {
      userId,
      fishId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_fish_stocks?.returning[0];
  },
};
