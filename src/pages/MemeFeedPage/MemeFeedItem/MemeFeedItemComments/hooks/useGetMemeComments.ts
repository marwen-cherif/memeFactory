import { useInfiniteQuery } from '@tanstack/react-query';
import { MemeComment } from '@/api/api.ts';
import { Service } from '@/api';
import { BasePaginatedResponse } from '@/api/api.types.ts';
import { useCallback, useRef } from 'react';

export const GET_MEME_COMMENT_QUERY_KEY = 'getMemeComments';

export const useGetMemeComments = ({ memeId }: { memeId: string }) => {
  const observer = useRef<IntersectionObserver>();

  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: BasePaginatedResponse<MemeComment>,
      _,
      lastPageParam
    ) =>
      lastPageParam < lastPage.total / lastPage.pageSize
        ? lastPageParam + 1
        : undefined,
    queryKey: [GET_MEME_COMMENT_QUERY_KEY, { memeId }],
    queryFn: ({ pageParam }) => Service.getMemeComments(memeId, pageParam),
  });

  const memeComments = data?.pages.flatMap((page) => page.results) ?? [];

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return {
    isFetchingNextPage,
    memeComments,
    hasNextPage,
    lastElementRef,
    commentsCount: data?.pages[0].total,
  };
};
