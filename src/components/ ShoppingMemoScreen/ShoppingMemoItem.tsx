import React, { FC } from 'react';
import { ShoppingMemo, useShoppingMemoActions } from '@src/states/shoppingMemo';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedCheckbox from '@src/components/common/AnimatedCheckbox';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import CachedImage from 'expo-cached-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequestDeleteShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestDeleteShoppingMemo';

type Props = {
  item: ShoppingMemo['byId'][number];
  onChangeChecked: (id: string, isChecked: boolean) => void;
  onLongPress: (id: string) => void;
};

export const ShoppingMemoItem: FC<Props> = ({
  item,
  onChangeChecked,
  onLongPress,
}) => {
  const shoppingMemoActions = useShoppingMemoActions();
  const requestDeleteShoppingMemo = useRequestDeleteShoppingMemo();

  const handlePressDeleteButton = () => {
    Alert.alert('削除しますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        onPress: () => {
          shoppingMemoActions.deleteShoppingMemo({
            id: item.id,
          });
          requestDeleteShoppingMemo({
            shoppingMemoId: item.id,
          });
        },
      },
    ]);
  };

  const handlePressCheckbox = (isChecked: boolean) => {
    onChangeChecked(item.id, isChecked);
  };

  const handleLongPress = () => {
    onLongPress(item.id);
  };

  return (
    <Pressable style={styles.listItem} onLongPress={handleLongPress}>
      <View style={styles.listItemContent}>
        <AnimatedCheckbox
          isChecked={item.isChecked}
          onCheck={handlePressCheckbox}
        />
        <CachedImage
          source={{ uri: item.imageUri }}
          cacheKey={generateEncodeString([item.name, item.id.toString()])}
          style={[
            {
              width: 40,
              height: 40,
              borderRadius: 5,
            },
            item.isChecked ? { opacity: 0.5 } : {},
          ]}
        />
        <Text
          style={
            item.isChecked
              ? {
                  fontSize: 16,
                  textDecorationLine: 'line-through',
                  color: 'gray',
                }
              : {
                  fontSize: 16,
                }
          }
        >
          {item.displayName}
        </Text>
      </View>
      <View style={styles.listItemContent}>
        <Text>{item.quantity}</Text>
        <Text style={{ fontSize: 13, color: 'gray' }}>{item.unitName}</Text>
        <TouchableOpacity
          style={styles.trashIcon}
          onPress={handlePressDeleteButton}
        >
          <Icon name="trash-can-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    marginTop: 2,
    backgroundColor: '#f8f9fa',
    borderColor: '#e1e4e8',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemContent: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#dc3545',
  },
});
