import { NotFoundError, UnauthorizedError } from '@/api/api.errors.ts';

function checkStatus(response: Response) {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 404) {
    throw new NotFoundError();
  }
  return response;
}

export async function publicApiCall<T>(
  url: string,
  options: { body?: Record<string, unknown>; method?: string }
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const response = await fetch(url, { ...options, headers, body });
  const checkedResponse = checkStatus(response);
  return checkedResponse.json();
}

export async function apiCall<T>(
  url: string,
  token: string,
  options: { body?: Record<string, unknown>; method?: string }
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const response = await fetch(url, { ...options, headers, body });
  const checkedResponse = checkStatus(response);
  return checkedResponse.json();
}