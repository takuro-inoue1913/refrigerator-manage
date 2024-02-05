import React from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';

export const RecipeScreen = () => {
  return (
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
      }}
    />
  );
};
