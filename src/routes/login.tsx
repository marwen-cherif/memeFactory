import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/pages/LoginPage.tsx';

type SearchParams = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search): SearchParams => {
    return {
      redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    }
  },
  component: LoginPage,
});
