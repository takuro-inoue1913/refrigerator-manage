import { atom } from 'recoil';
import { UserInfo } from 'firebase/auth';

export const userState = atom<UserInfo | null>({
  key: 'authUser',
  default: null,
});

export const idTokenState = atom<string | null>({
  key: 'idToken',
  default: null,
});
