import { createMemeComment, getMemeComments, getMemes, getUserById, login } from '@/api/api.ts';

export const Service = {
  getMemes,
  login,
  getUserById,
  getMemeComments,
  createMemeComment,
};
