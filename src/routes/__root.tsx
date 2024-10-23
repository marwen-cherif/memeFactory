import { createRootRouteWithContext } from '@tanstack/react-router';
import { AuthenticationState } from '../contexts/authentication';
import { Layout } from '../components/Layout.tsx';

type RouterContext = {
  authState: AuthenticationState;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});
