import { atom, selector } from 'recoil';
import { User } from 'firebase/auth';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user;
  },
});
