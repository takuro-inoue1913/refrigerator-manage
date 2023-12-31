import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';

import { useGetVegetableMaster } from '@src/interface/hooks/useGetVegetableMaster';
export const FridgeScreen = () => {
  const { data } = useGetVegetableMaster();

  if (!data) {
    return <Text>loading...</Text>;
  }

  return (
    <View>
      {data.map((vegetable) => (
        <Image
          key={vegetable.vegetable_id}
          source={{ uri: vegetable.image_uri }}
          style={{ width: 66, height: 58 }}
        />
      ))}
    </View>
  );
};
