import React, { useState, ComponentProps, FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';

type Props = ComponentProps<typeof Image>;

/**
 * 画像のプレースホルダーを表示するコンポーネント
 */
export const PlaceholderImage: FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <SkeletonImage />}
      <Image
        {...props}
        onLoadEnd={() => setIsLoaded(true)}
        style={[
          styles.image,
          isLoaded ? styles.imageVisible : styles.imageHidden,
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  imageVisible: {
    opacity: 1,
  },
  imageHidden: {
    opacity: 0,
  },
});
