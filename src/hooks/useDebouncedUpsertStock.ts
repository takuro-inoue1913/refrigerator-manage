import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';
import { OnPressImageArgs } from '@src/utils/consts';

type FnArgs = {
  id: number;
  quantity: number;
};

type UpsertVegetablesStockArgs = {
  /** debounce するリクエスト処理を行う関数。 */
  debounceUpsertStock: (args: FnArgs) => void;
  /** 在庫を増やす際に呼び出す関数。 */
  increaseStock: (args: FnArgs) => void;
  /** 在庫を減らす際に呼び出す関数。 */
  decreaseStock: (args: FnArgs) => void;
};

/**
 * 在庫を増減させるリクエスト処理を debounce するカスタムフック。
 */
export const useDebouncedUpsertStock = ({
  debounceUpsertStock,
  increaseStock,
  decreaseStock,
}: UpsertVegetablesStockArgs) => {
  const stockQuantities = useRef<{ [id: number]: number }>({});

  const debouncedUpsertStock = useRef(
    debounce(async () => {
      // MEMO: debounce 中に複数の項目が更新される可能性があるため、現在オブジェクトに入っている値を全て更新する。
      Object.entries(stockQuantities.current).forEach(([key, value]) => {
        debounceUpsertStock({
          id: Number(key),
          quantity: value,
        });
        delete stockQuantities.current[Number(key)];
      });
    }, 1000),
  );

  const onIncreaseStock = useCallback(
    async ({
      targetId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      increaseStock({
        id: targetId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[targetId] = currentQuantity + incrementalUnit;
      debouncedUpsertStock.current();
    },
    [increaseStock, debouncedUpsertStock],
  );

  const onDecreaseStock = useCallback(
    async ({
      targetId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      decreaseStock({
        id: targetId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[targetId] = Math.max(
        currentQuantity - incrementalUnit,
        0,
      );
      debouncedUpsertStock.current();
    },
    [decreaseStock, debouncedUpsertStock],
  );

  return {
    /** 在庫を増やす関数。 */
    onIncreaseStock,
    /** 在庫を減らす関数。 */
    onDecreaseStock,
  };
};
