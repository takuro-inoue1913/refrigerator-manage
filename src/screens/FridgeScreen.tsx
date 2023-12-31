import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';

export const FridgeScreen = () => {
  return (
    <View>
      <Text>FridgeScreen</Text>
      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/refrigerator-manage.appspot.com/o/master-images%2Ftamanegi.jpeg?alt=media&token=f2414689-2649-4594-8fc0-b0144e166b1b',
        }}
        style={{ width: 66, height: 58 }}
      />
    </View>
  );
};
