import { useCallback, useEffect } from 'react';
import {
  calculateRemainingTime,
  getLocalToken,
  removeLocalToken,
  setLocalToken,
} from '../utils/userUtil';
import { useRecoilState } from 'recoil';
import { userState } from '../recoils';

let logoutTimer: any;
export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);
  const { token, id, expirationTime } = getLocalToken();
  const remainingTime =
    expirationTime === null ? 0 : calculateRemainingTime(expirationTime);

  const logoutHandler = useCallback(() => {
    removeLocalToken();
    setUser({
      token: '',
      isLoggedIn: false,
      ID: '',
    });
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token: string, expirationTime: string, id: string) => {
      const remainingTime =
        expirationTime === null ? 0 : calculateRemainingTime(expirationTime);
      // @ts-ignore
      setLocalToken(token, expirationTime, id);
      setUser({
        // @ts-ignore
        token,
        isLoggedIn: true,
        // @ts-ignore
        ID: id,
      });
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [],
  );

  useEffect(() => {
    const logoutCond =
      !token || !id || !expirationTime || remainingTime <= 0;
    if (logoutCond) {
      if (user.isLoggedIn) {
        logoutHandler();
      }
      return;
    }
    if (user.isLoggedIn) {
      return;
    }
    loginHandler(token, expirationTime, id);
  }, []);

  return {
    user,
    loginHandler,
    logoutHandler,
  };
};
