import React, { useState, ComponentProps, FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = ComponentProps<typeof Image>;

/**
 * 画像のプレースホルダーを表示するコンポーネント
 */
export const PlaceholderImage: FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <View style={styles.damiImg} />}
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
  damiImg: {
    position: 'absolute',
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e1e4e8',
  },
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
