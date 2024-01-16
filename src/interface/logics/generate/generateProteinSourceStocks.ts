import { GetAllProteinSourceMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { ProteinSourceStocks } from '@src/states/fridge/proteinSource';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonProteinSourceMasterType = Omit<
  GetAllProteinSourceMasterAndUnitAndStocksQuery['GetProteinSourceMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateProteinSourceStocks = (
  data: GetAllProteinSourceMasterAndUnitAndStocksQuery,
): ProteinSourceStocks => {
  const ids: string[] = [];
  const staple_foodMasterData = convertProteinSourceMasterData(
    'staple_foodMaster',
    data.GetProteinSourceMasterAndUnitAndStocks,
  );

  const customProteinSourceMasterData = convertProteinSourceMasterData(
    'customProteinSourceMaster',
    data.GetCustomProteinSourceMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(staple_foodMasterData).map((id) => id));
  ids.push(...Object.keys(customProteinSourceMasterData).map((id) => id));

  const byId = {
    ...staple_foodMasterData,
    ...customProteinSourceMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertProteinSourceMasterData = (
  __typename: 'staple_foodMaster' | 'customProteinSourceMaster',
  masterData:
    | GetAllProteinSourceMasterAndUnitAndStocksQuery['GetCustomProteinSourceMasterAndUnitAndStocks']
    | GetAllProteinSourceMasterAndUnitAndStocksQuery['GetProteinSourceMasterAndUnitAndStocks'],
): ProteinSourceStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as ProteinSourceStocks['byId'];
  }

  const commonData = [...masterData] as CommonProteinSourceMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.protein_source_id] = {
        id: cur.protein_source_id,
        name: cur.protein_source_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.protein_source_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.protein_source_master_unit_master!.unit_name,
        hasStock:
          cur.protein_source_master_protein_source_stocks !== undefined &&
          cur.protein_source_master_protein_source_stocks !== null &&
          cur.protein_source_master_protein_source_stocks.expiration_date !==
            null &&
          cur.protein_source_master_protein_source_stocks.quantity > 0,
        stockId:
          cur.protein_source_master_protein_source_stocks?.stock_id ?? null,
        quantity:
          cur.protein_source_master_protein_source_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.protein_source_master_protein_source_stocks?.incremental_unit ??
          getIncrementalUnit(
            cur.protein_source_master_unit_master?.unit_name ?? '',
          ),
        expirationDate:
          cur.protein_source_master_protein_source_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.protein_source_master_protein_source_stocks?.memo ?? '',
        isFavorite:
          cur.protein_source_master_protein_source_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
        isCustomMaster: __typename === 'customProteinSourceMaster',
      };
      return acc;
    },
    {} as ProteinSourceStocks['byId'],
  );
};
