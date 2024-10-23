import { FC } from 'react';
import { useAuthentication } from '../contexts/authentication.tsx';
import { Navigate, Outlet, useLocation } from '@tanstack/react-router';

export const CheckAuthorized: FC = () => {
  const { state } = useAuthentication();
  const { pathname } = useLocation();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: pathname }} replace />;
  }

  return <Outlet />;
};
