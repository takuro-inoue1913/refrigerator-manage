import { SubmitValues } from '@src/components/DailyRecipeScreen/SettingDailyRecipeModal';
import { SelectFridgeCategory } from '@src/states/fridge';

export type FridgeItemCreateRouteParams = {
  fridgeCategory: SelectFridgeCategory;
};

export type AddMissingMaterialsRouteParams = {
  submitValues: SubmitValues;
  date: string;
};

export type RecipeDetailRouteParams = {
  recipeId: string;
};

export type RecipeEditRouteParams = {
  recipeId: string;
};

export type RootStackParamList = {
  ログイン: undefined;
  冷蔵庫管理: undefined;
  食材新規登録: FridgeItemCreateRouteParams;
  パスワードリセット: undefined;
  毎日のレシピ: undefined;
  レシピ新規登録: undefined;
  レシピ詳細: RecipeDetailRouteParams;
  追加する材料: AddMissingMaterialsRouteParams;
  マイページ: undefined;
  レシピ一覧: undefined;
  レシピ編集: RecipeEditRouteParams;
};

/** 画像を押したときの引数の型。 */
export type OnPressImageArgs = {
  /** 対象ID */
  targetId: string;
  /** 現在の在庫数 */
  currentQuantity: number;
  /** 増減単位 */
  incrementalUnit: number;
};

/** 冷蔵庫の在庫の型 */
export type FridgeStock = {
  /** ID。 */
  id: string;
  /** 名前（ひらがな） */
  name: string;
  /** 表示名 */
  displayName: string;
  /** 画像URI */
  imageUri: string;
  /** 単位ID */
  unitId: number;
  /** 単位名 */
  unitName: string;
  /** 在庫があるかどうか */
  hasStock: boolean;
  /** 在庫ID */
  stockId: string | null;
  /** 在庫数 */
  quantity: number;
  /** 増減単位 */
  incrementalUnit: number;
  /** 賞味期限日 */
  expirationDate: string;
  /** メモ */
  memo: string;
  /** お気に入りかどうか */
  isFavorite: boolean;
  /** 基本賞味期限期間 */
  defaultExpirationPeriod: number;
  /** ユーザー独自の master かどうか */
  isCustomMaster: boolean;
};

/** 正規化された配列の型 */
export type NormalizedArray<T> = {
  ids: string[];
  byId: {
    [key: string]: T;
  };
};
