/** useNavigation hook */
export type Navigation = {
  navigate: (screen: string) => void;
};

/** 画像を押したときの引数の型。 */
export type OnPressImageArgs = {
  /** 対象ID */
  targetId: number;
  /** 現在の在庫数 */
  currentQuantity: number;
  /** 増減単位 */
  incrementalUnit: number;
};

/** 冷蔵庫の在庫の型 */
export type FridgeStock = {
  /** ID */
  id: number;
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
  stockId: number | null;
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
};
