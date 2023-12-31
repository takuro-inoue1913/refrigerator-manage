import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';

import { useGetVegetableMaster } from '@src/interface/hooks/useGetVegetableMaster';
export const FridgeScreen = () => {
  const { data, isFetched } = useGetVegetableMaster();

  if (!data) {
    return <Text>loading...</Text>;
  }

  return (
    <View>
      {isFetched &&
        data.map((vegetable) => (
          <Image
            key={vegetable.vegetable_id}
            source={{ uri: vegetable.image_uri }}
            style={{ width: 66, height: 58 }}
          />
        ))}
      <Text>FridgeScreen</Text>
    </View>
  );
};
