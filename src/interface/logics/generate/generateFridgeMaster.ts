import { GetAllFridgeMasterQuery } from '@src/interface/__generated__/graphql';
import { FridgeMaster, TypeName } from '@src/states/fridge';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepOmit<T, K extends keyof any> = T extends object
  ? { [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K> }
  : T;

type CommonMasterType = DeepOmit<
  GetAllFridgeMasterQuery['vegetable_master'][number],
  '__typename'
>;

/**
 * 野菜マスタと野菜在庫から野菜在庫のオブジェクトを生成する。
 * @param {GetAllFridgeMasterQuery} data
 */
export const generateFridgeMaster = (
  data: GetAllFridgeMasterQuery,
): FridgeMaster[] => {
  const vegetableMasterData = convertMasterData(
    'vegetable_master',
    data.vegetable_master,
  );
  const customVegetableMasterData = convertMasterData(
    'custom_vegetable_master',
    data.custom_vegetable_master,
  );
  const dessertMasterData = convertMasterData(
    'dessert_master',
    data.dessert_master,
  );
  const customDessertMasterData = convertMasterData(
    'custom_dessert_master',
    data.custom_dessert_master,
  );
  const fishMasterData = convertMasterData('fish_master', data.fish_master);
  const customFishMasterData = convertMasterData(
    'custom_fish_master',
    data.custom_fish_master,
  );
  const meatMasterData = convertMasterData('meat_master', data.meat_master);
  const customMeatMasterData = convertMasterData(
    'custom_meat_master',
    data.custom_meat_master,
  );
  const otherMasterData = convertMasterData('other_master', data.other_master);
  const customOtherMasterData = convertMasterData(
    'custom_other_master',
    data.custom_other_master,
  );
  const proteinSourceMasterData = convertMasterData(
    'protein_source_master',
    data.protein_source_master,
  );
  const customProteinSourceMasterData = convertMasterData(
    'custom_protein_source_master',
    data.custom_protein_source_master,
  );
  const seasoningMasterData = convertMasterData(
    'seasoning_master',
    data.seasoning_master,
  );
  const customSeasoningMasterData = convertMasterData(
    'custom_seasoning_master',
    data.custom_seasoning_master,
  );
  const spiceMasterData = convertMasterData('spice_master', data.spice_master);
  const customSpiceMasterData = convertMasterData(
    'custom_spice_master',
    data.custom_spice_master,
  );
  const stapleFoodMasterData = convertMasterData(
    'staple_food_master',
    data.staple_food_master,
  );

  return [
    ...vegetableMasterData,
    ...customVegetableMasterData,
    ...dessertMasterData,
    ...customDessertMasterData,
    ...fishMasterData,
    ...customFishMasterData,
    ...meatMasterData,
    ...customMeatMasterData,
    ...otherMasterData,
    ...customOtherMasterData,
    ...proteinSourceMasterData,
    ...customProteinSourceMasterData,
    ...seasoningMasterData,
    ...customSeasoningMasterData,
    ...spiceMasterData,
    ...customSpiceMasterData,
    ...stapleFoodMasterData,
  ];
};

const convertMasterData = (
  __typeName: TypeName,
  masterData: CommonMasterType[],
): FridgeMaster[] => {
  if (masterData.length === 0) {
    return [] as FridgeMaster[];
  }

  const _masterData = masterData.map((data) => ({
    id: data.id,
    name: data.name,
    displayName: data.display_name,
    imageUri: data.image_uri,
    fridgeType: __typeName,
    unitName: data.unit_master?.unit_name ?? '',
    incrementalUnit:
      data.stack?.incremental_unit ??
      getIncrementalUnit(data.unit_master?.unit_name ?? ''),
    quantity: data.stack?.quantity ?? 0,
    hasStock: data.stack !== null,
    defaultExpirationPeriod: data.default_expiration_period,
  }));

  return _masterData;
};
