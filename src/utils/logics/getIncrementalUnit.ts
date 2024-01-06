export type UnitName =
  | '個'
  | '本'
  | 'g'
  | '束'
  | '袋'
  | '枚'
  | '本'
  | '箱'
  | '缶'
  | 'L'
  | 'ml'
  | 'cc'
  | 'カップ'
  | '合'
  | '切'
  | 'パック'
  | '玉'
  | '丁'
  | string;

/** 単位名から増減単位を取得する。 */
export const getIncrementalUnit = (unitName: UnitName) => {
  switch (unitName) {
    case '個':
    case '本':
    case '束':
    case '袋':
    case '枚':
    case '箱':
    case '缶':
    case 'カップ':
    case '合':
    case '切':
    case 'パック':
    case '玉':
    case '丁':
      return 1;
    case 'g':
    case 'ml':
    case 'cc':
      return 50;
    case 'L':
      return 1;
    default:
      return 1;
  }
};
