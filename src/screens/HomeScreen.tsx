import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';

import { auth } from '@src/utils/firebaseSettings';
import { handleFirebaseError } from '@src/utils/handleFirebaseError';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

export const HomeScreen = () => {
  const navigation = useTypedNavigation();
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'ログアウトに失敗しました。',
        text2: handleFirebaseError(error.code),
      });
    });
  };

  const menu = [
    {
      id: '1',
      title: 'レシピ管理',
      onPress: () => {
        navigation.navigate('レシピ管理');
      },
    },
    {
      id: '2',
      title: 'ログアウト',
      onPress: () => {
        Alert.alert('ログアウトしますか？', '', [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: 'ログアウト',
            onPress: handleLogout,
          },
        ]);
      },
    },
  ];

  const renderItem = ({ item }: { item: (typeof menu)[number] }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={item.onPress}>
        <Text>{item.title}</Text>
        <Icon name="chevron-right" size={20} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    marginTop: 2,
    borderColor: '#e1e4e8',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
