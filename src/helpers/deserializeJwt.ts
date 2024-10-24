import { jwtDecode } from 'jwt-decode';

export function deserializeJwt<T>(jwt: string) {
  try {
    return jwtDecode<T>(jwt);
  } catch (error) {
    localStorage.removeItem('token');

    return undefined;
  }
}
