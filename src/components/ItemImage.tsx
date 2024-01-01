import React, { useState, ComponentProps, FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import commonStyle from '@src/utils/commonStyle';
import { ItemBadge } from '@src/components/ItemBadge';

type Props = {
  /** 画像の読み込みが完了した時に実行される関数。 */
  onLoadEnd?: () => void;
  /** 在庫があるかどうか */
  hasStock: boolean;
  /** 在庫数 */
  quantity: number;
  /** 単位名 */
  unitName: string;
} & ComponentProps<typeof Image>;

/**
 * 項目の画像を表示するコンポーネント。
 */
export const ItemImage: FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <SkeletonImage />}
      <Image
        {...props}
        onLoadEnd={() => setIsLoaded(true)}
        style={[
          props.hasStock ? styles.activeImage : styles.image,
          isLoaded ? styles.imageVisible : styles.imageHidden,
        ]}
      />
      {isLoaded && props.hasStock && (
        <ItemBadge quantity={props.quantity} unitName={props.unitName} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    ...commonStyle.image,
    borderWidth: 3,
    borderColor: '#e1e4e8',
  },
  activeImage: {
    ...commonStyle.image,
    borderWidth: 3,
    borderColor: '#2ecc71',
  },
  imageVisible: {
    opacity: 1,
  },
  imageHidden: {
    opacity: 0,
  },
});
