import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@src/types';
import { useCallback } from 'react';

export function useTypedNavigation<T extends keyof RootStackParamList>() {
  const navigation = useNavigation<NavigationProp<RootStackParamList, T>>();

  const navigate = useCallback(
    (screen: T, params?: RootStackParamList[T]) => {
      if (params) {
        const _navigationNavigate = navigation.navigate as (
          screen: T,
          params: RootStackParamList[T],
        ) => void;
        _navigationNavigate(screen, params);
      } else {
        const _navigationNavigate = navigation.navigate as (screen: T) => void;
        _navigationNavigate(screen);
      }
    },
    [navigation],
  );

  return { navigate };
}
