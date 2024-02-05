import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import { Text, View } from 'react-native';

export const RecipeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  return (
    <View>
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
