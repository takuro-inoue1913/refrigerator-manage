import { selectFridgeCategoryState } from '@src/states/fridge';
import { selectItems } from '@src/utils/consts';
import React, { FC } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';

type Props = {
  children: React.ReactNode;
};

const { width: screenWidth } = Dimensions.get('window');
const halfScreenWidth = screenWidth / 4;
/**
 * 左右のスワイプを検知するコンポーネント。
 */
export const GestureHandlerView: FC<Props> = ({ children }) => {
  const [selectFridgeCategory, setSelectFridgeCategory] = useRecoilState(
    selectFridgeCategoryState,
  );
  selectItems;

  const onSwipe = ({
    nativeEvent,
  }: {
    nativeEvent: {
      translationX: number;
      oldState: State;
    };
  }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = nativeEvent;

      // 右にスワイプされた場合、selectItems から 現在選択されているカテゴリー の前のカテゴリーを取得する
      if (translationX > halfScreenWidth) {
        selectItems.find((item, index) => {
          if (item === selectFridgeCategory) {
            setSelectFridgeCategory(
              selectItems[index - 1] ?? selectItems[selectItems.length - 1],
            );
          }
        });
        Alert.alert('Swiped Right', 'You swiped right!');
      }
      // 左にスワイプされた場合、selectItems から 現在選択されているカテゴリー の次のカテゴリーを取得する
      if (translationX < -halfScreenWidth) {
        selectItems.find((item, index) => {
          if (item === selectFridgeCategory) {
            setSelectFridgeCategory(selectItems[index + 1] ?? selectItems[0]);
          }
        });
        Alert.alert('Swiped Left', 'You swiped left!');
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onHandlerStateChange={onSwipe}
        activeOffsetX={[-halfScreenWidth, halfScreenWidth]}
      >
        {children}
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};
