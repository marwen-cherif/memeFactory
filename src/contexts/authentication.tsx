import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { deserializeJwt } from '@/helpers/deserializeJwt.ts';
import { InvalidTokenError } from '@/api/api.errors.ts';

export type AuthenticationState =
  | {
      isAuthenticated: true;
      token: string;
      userId: string;
    }
  | {
      isAuthenticated: false;
    };

export type Authentication = {
  state: AuthenticationState;
  authenticate: (token: string) => void;
  signout: () => void;
};

export const AuthenticationContext = createContext<Authentication | undefined>(undefined);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialJwt = localStorage.getItem('token');

  const parsedJwt = initialJwt ? deserializeJwt<{ id: string }>(initialJwt) : undefined;

  const [state, setState] = useState<AuthenticationState>(
    initialJwt && parsedJwt?.id
      ? {
          isAuthenticated: true,
          token: initialJwt,
          userId: parsedJwt.id,
        }
      : {
          isAuthenticated: false,
        }
  );

  const authenticate = useCallback(
    (token: string) => {
      const userId = deserializeJwt<{ id: string }>(token)?.id;

      if (!userId) {
        throw new InvalidTokenError();
      }

      setState({
        isAuthenticated: true,
        token,
        userId: userId,
      });
    },
    [setState]
  );

  const signout = useCallback(() => {
    setState({ isAuthenticated: false });
    localStorage.removeItem('token');
  }, [setState]);

  const contextValue = useMemo(() => ({ state, authenticate, signout }), [state, authenticate, signout]);

  return <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>;
};

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('useAuthentication must not be used within an AuthenticationProvider');
  }

  return context;
}

export function useUserId() {
  const { state } = useAuthentication();

  if (!state.isAuthenticated) {
    throw new Error('User is not authenticated');
  }

  return state.userId;
}
