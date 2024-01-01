import React, { useState, ComponentProps, FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import commonStyle from '@src/utils/commonStyle';

type Props = {
  onLoadEnd?: () => void;
  isActive?: boolean;
} & ComponentProps<typeof Image>;

export const ItemImage: FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <SkeletonImage />}
      <Image
        {...props}
        onLoadEnd={() => setIsLoaded(true)}
        style={[
          props.isActive ? styles.activeImage : styles.image,
          isLoaded ? styles.imageVisible : styles.imageHidden,
        ]}
      />
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
