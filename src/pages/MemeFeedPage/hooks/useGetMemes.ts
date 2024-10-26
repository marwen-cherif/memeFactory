import { useInfiniteQuery } from '@tanstack/react-query';
import { Meme } from '@/api/api.ts';
import { Service } from '@/api';
import { BasePaginatedResponse } from '@/api/api.types.ts';
import { useCallback, useRef } from 'react';

export const GET_MEMES_QUERY_KEY = 'getMemes';

export const useGetMemes = () => {
  const observer = useRef<IntersectionObserver>();

  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: BasePaginatedResponse<Meme>,
      _,
      lastPageParam
    ) =>
      lastPageParam < lastPage.total / lastPage.pageSize
        ? lastPageParam + 1
        : undefined,
    queryKey: [GET_MEMES_QUERY_KEY],
    queryFn: ({ pageParam }) => Service.getMemes(pageParam),
  });

  const memes = data?.pages.flatMap((page) => page.results) ?? [];

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries?.[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return { isFetchingNextPage, memes, hasNextPage, lastElementRef };
};
