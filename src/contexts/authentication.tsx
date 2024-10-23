import { jwtDecode } from 'jwt-decode';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

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

  const [state, setState] = useState<AuthenticationState>(
    initialJwt
      ? {
          isAuthenticated: true,
          token: initialJwt,
          userId: jwtDecode<{ id: string }>(initialJwt).id,
        }
      : {
          isAuthenticated: false,
        }
  );

  const authenticate = useCallback(
    (token: string) => {
      setState({
        isAuthenticated: true,
        token,
        userId: jwtDecode<{ id: string }>(token).id,
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
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
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
