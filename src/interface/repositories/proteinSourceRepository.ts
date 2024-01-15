import dayjs from 'dayjs';
import {
  GetAllProteinSourceMasterAndUnitAndStocksDocument,
  GetProteinSourceStockByUserIdAndProteinSourceIdDocument,
  InsertProteinSourceStockDocument,
  UpdateProteinSourceStockQuantityDocument,
  UpdateProteinSourceStockDetailDocument,
  UpdateProteinSourceStockIsFavoriteDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

type GetOneProteinSourceStockArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceId: string;
};

type InsertProteinSourceStockArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceId: string;
  quantity: number;
  incrementalUnit: number;
  defaultExpirationPeriod: number;
  isFavorite?: boolean;
};

type UpdateProteinSourceStockArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceId: string;
  quantity: number;
  defaultExpirationPeriod: number;
};

type UpdateDetailArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceId: string;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
  isFavorite: boolean;
};

type UpdateIsFavoriteArgs = {
  idToken: string | null;
  userId: string;
  proteinSourceId: string;
  isFavorite: boolean;
};

export const proteinSourceStockRepository = {
  getOne: async ({
    idToken,
    userId,
    proteinSourceId,
  }: GetOneProteinSourceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetProteinSourceStockByUserIdAndProteinSourceIdDocument,
      {
        userId,
        proteinSourceId,
      },
    );

    return data.protein_source_stocks;
  },
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      GetAllProteinSourceMasterAndUnitAndStocksDocument,
    );

    return data;
  },
  insert: async ({
    idToken,
    userId,
    proteinSourceId,
    quantity,
    incrementalUnit,
    defaultExpirationPeriod,
    isFavorite,
  }: InsertProteinSourceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(InsertProteinSourceStockDocument, {
      object: {
        user_id: userId,
        protein_source_id: proteinSourceId,
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
    return data.insert_protein_source_stocks_one;
  },
  updateQuantity: async ({
    idToken,
    userId,
    proteinSourceId,
    quantity,
    defaultExpirationPeriod,
  }: UpdateProteinSourceStockArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      UpdateProteinSourceStockQuantityDocument,
      {
        userId,
        proteinSourceId,
        quantity,
        expirationDate: dayjs()
          .add(defaultExpirationPeriod, 'day')
          .format('YYYY-MM-DD'),
      },
    );
    return data.update_protein_source_stocks?.returning[0];
  },
  updateIsFavorite: async ({
    idToken,
    userId,
    proteinSourceId,
    isFavorite,
  }: UpdateIsFavoriteArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(
      UpdateProteinSourceStockIsFavoriteDocument,
      {
        userId,
        proteinSourceId,
        isFavorite,
      },
    );
    return data.update_protein_source_stocks?.returning[0];
  },
  updateDetail: async ({
    idToken,
    userId,
    proteinSourceId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: UpdateDetailArgs) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateProteinSourceStockDetailDocument, {
      userId,
      proteinSourceId,
      quantity,
      incrementalUnit,
      expirationDate,
      memo,
      isFavorite,
    });
    return data.update_protein_source_stocks?.returning[0];
  },
};
