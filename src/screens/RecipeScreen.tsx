import React from 'react';
import dayjs from 'dayjs';
import { CalendarList, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['jp'] = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  today: '今日',
};
LocaleConfig.defaultLocale = 'jp';

export const RecipeScreen = () => {
  return (
    <CalendarList
      // 縦スクロールを有効化
      horizontal={false}
      // 無限スクロールを有効化
      pagingEnabled={true}
      // 現在の月から何ヶ月前まで表示するか
      pastScrollRange={12}
      // 現在の月から何ヶ月後まで表示するか
      futureScrollRange={12}
      // スクロール時に月が変わったことを検知するコールバック
      onVisibleMonthsChange={(months) => {
        console.log('now these months are visible', months);
      }}
      // 現在の日付をマーク
      markedDates={{
        [dayjs().format('YYYY-MM-DD')]: { selected: true },
      }}
      // その他のカレンダーオプション...
    />
  );
};
