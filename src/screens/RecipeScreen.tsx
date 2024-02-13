import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonGradation } from '@src/components/common/CommonGradation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

export const RecipeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const navigation = useTypedNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('レシピ新規登録');
        }}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="silverware-fork-knife" size={30} color="white" />
        </CommonGradation>
      </TouchableOpacity>
      <Calendar
        horizontal={false}
        pagingEnabled={true}
        pastScrollRange={12}
        futureScrollRange={12}
        onVisibleMonthsChange={(months) => {
          console.log('now these months are visible', months);
        }}
        enableSwipeMonths={true}
        markedDates={{
          [dayjs().format('YYYY-MM-DD')]: {
            textColor: COMMON_COLOR_GREEN,
          },
          [selectedDate]: {
            selected: true,
            selectedColor: COMMON_COLOR_GREEN,
          },
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
      <View>
        <Text>RecipeScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  commonGradation: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
