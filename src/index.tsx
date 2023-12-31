import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from '@src/App';

/**
 * App.tsxのラッパー。
 * MEMO: App.tsx で useRecoilState を使用しているため、一階層上で RecoilRoot でラップする必要がある。
 */
export const AppWrapper: FC = () => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  );
};
