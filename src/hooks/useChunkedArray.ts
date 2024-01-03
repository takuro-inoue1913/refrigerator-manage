import { useMemo } from 'react';

/**
 * 特定のサイズで配列をチャンク（グループ化）に分割するフック。
 *
 * @param array 配列
 * @param chunkSize チャンクサイズ
 */
export const useChunkedArray = <ArrayType>(
  array: ArrayType[],
  chunkSize: number,
) => {
  return useMemo(() => {
    const newRows = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      newRows.push(array.slice(i, i + chunkSize));
    }
    return newRows;
  }, [array, chunkSize]);
};
