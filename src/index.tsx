import React, { FC, useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from '@src/App';

import '@src/utils/dayjsConfig';
import { LogBox } from 'react-native';

const DebugObserver = ({ isDebug }: { isDebug?: boolean }) => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    if (!isDebug) return;
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot, isDebug]);

  return null;
};

/**
 * App.tsxのラッパー。
 * MEMO: App.tsx で useRecoilState を使用しているため、一階層上で RecoilRoot でラップする必要がある。
 */
export const AppWrapper: FC = () => {
  // MEMO: 最初のキャシュがない画像読み込みの時に出る警告を無視する。
  LogBox.ignoreLogs([/Could not find image file./]);

  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <DebugObserver />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  );
};
