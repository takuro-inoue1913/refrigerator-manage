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
