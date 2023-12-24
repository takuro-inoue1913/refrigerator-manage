import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';

import { App } from '@src/App';

/**
 * App.tsxのラッパー。
 * MEMO: App.tsx で useRecoilState を使用しているため、一階層上で RecoilRoot でラップする必要がある。
 */
export const AppWrapper: FC = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};
