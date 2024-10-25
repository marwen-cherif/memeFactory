import { NotFoundError, UnauthorizedError } from '@/api/api.errors.ts';
import { redirect } from '@tanstack/react-router';

function checkStatus(response: Response) {
  if (response.status === 401) {
    localStorage.removeItem('token');

    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
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
  options: { body?: Record<string, unknown>; method?: string }
): Promise<T> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new UnauthorizedError();
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const response = await fetch(url, { ...options, headers, body });
  const checkedResponse = checkStatus(response);
  return checkedResponse.json();
}

export async function multipartApiCall<T>(
  url: string,
  data: Record<string, unknown> = {}
): Promise<T> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new UnauthorizedError();
  }

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        Object.keys(item).forEach((subKey) => {
          formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
        });
      });
    } else {
      formData.append(key, data[key] as string | Blob | File);
    }
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  const checkedResponse = checkStatus(response);

  return checkedResponse.json();
}
