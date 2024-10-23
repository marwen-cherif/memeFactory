import { useInfiniteQuery } from '@tanstack/react-query';
import { Meme } from '@/api/api.ts';
import { Service } from '@/api';
import { BasePaginatedResponse } from '@/api/api.types.ts';

export const GET_MEMES_QUERY_KEY = 'getMemes';

export const useGetMemes = () => {
  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BasePaginatedResponse<Meme>, _, lastPageParam) =>
      lastPageParam < lastPage.total / lastPage.pageSize ? lastPageParam + 1 : undefined,
    queryKey: [GET_MEMES_QUERY_KEY],
    queryFn: ({ pageParam }) => Service.getMemes(pageParam),
  });

  const memes = data?.pages.flatMap((page) => page.results) ?? [];

  return { isFetchingNextPage, memes, fetchNextPage, hasNextPage };
};
