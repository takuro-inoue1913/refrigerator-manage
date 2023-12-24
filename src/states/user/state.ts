import { atom } from 'recoil';
import { UserInfo } from 'firebase/auth';

export const userState = atom<UserInfo | null>({
  key: 'authUser',
  default: null,
});
