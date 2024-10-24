import { publicApiCall, apiCall } from '@/api/api.helpers.ts';
import { BasePaginatedResponse } from './api.types';

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
 * @param id
 * @returns
 */
export async function getUserById(id: string): Promise<GetUserByIdResponse> {
  return apiCall<GetUserByIdResponse>(`${BASE_URL}/users/${id}`, { method: 'GET' });
}

export interface Meme {
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
}

/**
 * Get the list of memes for a given page
 * @param page
 * @returns
 */
export async function getMemes(page: number) {
  return apiCall<BasePaginatedResponse<Meme>>(`${BASE_URL}/memes?page=${page}`, { method: 'GET' });
}

export type MemeComment = {
  id: string;
  authorId: string;
  memeId: string;
  content: string;
  createdAt: string;
};

/**
 * Get comments for a meme
 * @param memeId
 * @returns
 */
export async function getMemeComments(memeId: string, page: number): Promise<BasePaginatedResponse<MemeComment>> {
  return apiCall<BasePaginatedResponse<MemeComment>>(`${BASE_URL}/memes/${memeId}/comments?page=${page}`, {
    method: 'GET',
  });
}

/**
 * Create a comment for a meme
 * @param memeId
 * @param content
 */
export async function createMemeComment(memeId: string, content: string): Promise<MemeComment> {
  return apiCall<MemeComment>(`${BASE_URL}/memes/${memeId}/comments`, {
    method: 'POST',
    body: { content },
  });
}
