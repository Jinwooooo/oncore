export const removeLocalToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('tokenTime');
};

export const getLocalToken = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const expirationTime = localStorage.getItem('tokenTime');
  return { token, id, expirationTime };
};

export const setLocalToken = (
  accessToken: string,
  expirationTime: string,
  userId: string,
) => {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('id', userId);
  localStorage.setItem('tokenTime', expirationTime);
};

export const calculateRemainingTime = (expirationTime: string) =>
  new Date(expirationTime).getTime() - new Date().getTime();
