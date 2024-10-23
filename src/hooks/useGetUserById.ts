import { useSuspenseQuery } from '@tanstack/react-query';
import { Service } from '@/api';

export const GET_USER_BY_ID_QUERY_KEY = 'getUserById';

export const useGetUserById = ({ userId }: { userId: string }) => {
  const { data: user } = useSuspenseQuery({
    staleTime: Infinity,
    queryKey: [GET_USER_BY_ID_QUERY_KEY, { userId }],
    queryFn: async () => {
      return await Service.getUserById(userId);
    },
  });

  return { user };
};
