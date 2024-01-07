import { selectFridgeCategoryState } from '@src/states/fridge';
import React, { FC } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { useSetRecoilState } from 'recoil';

type Props = {
  children: React.ReactNode;
};

const { width: screenWidth } = Dimensions.get('window');
const halfScreenWidth = screenWidth / 4;
/**
 * 左右のスワイプを検知するコンポーネント。
 */
export const GestureHandlerView: FC<Props> = ({ children }) => {
  const setSelectFridgeCategory = useSetRecoilState(selectFridgeCategoryState);

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
      if (translationX > halfScreenWidth) {
        setSelectFridgeCategory('野菜類');
        Alert.alert('Swiped Right', 'You swiped right!');
      }
      if (translationX < -halfScreenWidth) {
        setSelectFridgeCategory('肉類');
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
