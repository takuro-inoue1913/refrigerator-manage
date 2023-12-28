import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * キーボードが表示されているかどうかを管理するカスタムフック。
 */
export const useIsShowKeyboard = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsShowKeyboard(true);
      },
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsShowKeyboard(false);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isShowKeyboard;
};
