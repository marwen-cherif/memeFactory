import { useInfiniteQuery } from '@tanstack/react-query';
import { MemeComment } from '@/api/api.ts';
import { Service } from '@/api';
import { BasePaginatedResponse } from '@/api/api.types.ts';

export const GET_MEME_COMMENT_QUERY_KEY = 'getMemeComments';

export const useGetMemeComments = ({ memeId }: { memeId: string }) => {
  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BasePaginatedResponse<MemeComment>, _, lastPageParam) =>
      lastPageParam < lastPage.total / lastPage.pageSize ? lastPageParam + 1 : undefined,
    queryKey: [GET_MEME_COMMENT_QUERY_KEY, { memeId }],
    queryFn: ({ pageParam }) => Service.getMemeComments(memeId, pageParam),
  });

  const memeComments = data?.pages.flatMap((page) => page.results) ?? [];

  return { isFetchingNextPage, memeComments, fetchNextPage, hasNextPage };
};
