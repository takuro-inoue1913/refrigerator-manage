/**
 * 文字列の配列を受け取り、個別でエンコードし、「-」で結合した文字列を返す
 */
export const createEncodeStrings = (strings: string[]) => {
  return strings.map((string) => encodeURIComponent(string)).join('-');
};
