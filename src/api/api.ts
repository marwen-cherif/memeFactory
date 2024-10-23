import { publicApiCall, apiCall } from '@/api/api.helpers.ts';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export type LoginResponse = {
  jwt: string;
};

/**
 * Authenticate the user with the given credentials
 * @param username
 * @param password
 * @returns
 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  return publicApiCall<LoginResponse>(`${BASE_URL}/authentication/login`, {
    method: 'POST',
    body: { username, password },
  });
}

export type GetUserByIdResponse = {
  id: string;
  username: string;
  pictureUrl: string;
};

/**
 * Get a user by their id
 * @param token
 * @param id
 * @returns
 */
export async function getUserById(token: string, id: string): Promise<GetUserByIdResponse> {
  return apiCall<GetUserByIdResponse>(`${BASE_URL}/users/${id}`, token, {});
}

export type GetMemesResponse = {
  total: number;
  pageSize: number;
  results: {
    id: string;
    authorId: string;
    pictureUrl: string;
    description: string;
    commentsCount: string;
    texts: {
      content: string;
      x: number;
      y: number;
    }[];
    createdAt: string;
  }[];
};

/**
 * Get the list of memes for a given page
 * @param token
 * @param page
 * @returns
 */
export async function getMemes(token: string, page: number): Promise<GetMemesResponse> {
  return apiCall<GetMemesResponse>(`${BASE_URL}/memes?page=${page}`, token, {});
}

export type GetMemeCommentsResponse = {
  total: number;
  pageSize: number;
  results: {
    id: string;
    authorId: string;
    memeId: string;
    content: string;
    createdAt: string;
  }[];
};

/**
 * Get comments for a meme
 * @param token
 * @param memeId
 * @returns
 */
export async function getMemeComments(token: string, memeId: string, page: number): Promise<GetMemeCommentsResponse> {
  return apiCall<GetMemeCommentsResponse>(`${BASE_URL}/memes/${memeId}/comments?page=${page}`, token, {});
}

export type CreateCommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  memeId: string;
};

/**
 * Create a comment for a meme
 * @param token
 * @param memeId
 * @param content
 */
export async function createMemeComment(
  token: string,
  memeId: string,
  content: string
): Promise<CreateCommentResponse> {
  return apiCall<CreateCommentResponse>(`${BASE_URL}/memes/${memeId}/comments`, token, {
    method: 'POST',
    body: { content },
  });
}
