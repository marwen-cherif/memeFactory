import { createFileRoute } from '@tanstack/react-router';
import { CheckAuthorized } from '../components/CheckAuthorized.tsx';

export const Route = createFileRoute('/_authentication')({
  component: CheckAuthorized,
});
