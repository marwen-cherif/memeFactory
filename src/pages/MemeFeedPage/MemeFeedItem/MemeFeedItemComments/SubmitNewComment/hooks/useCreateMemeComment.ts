import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Service } from '@/api';
import { useForm } from 'react-hook-form';
import { GET_MEME_COMMENT_QUERY_KEY } from '@/pages/MemeFeedPage/MemeFeedItem/MemeFeedItemComments/hooks/useGetMemeComments.ts';
import { MemeComment } from '@/api/api.ts';

export const useCreateMemeComment = ({ memeId }: { memeId: string }) => {
  const formContext = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { memeId: string; content: string }) => {
      return await Service.createMemeComment(data.memeId, data.content);
    },
    onSuccess: async (memeComment) => {
      queryClient.setQueryData<{ pages: { results: MemeComment[] }[] }>(
        [GET_MEME_COMMENT_QUERY_KEY, { memeId }],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [
                {
                  results: [memeComment],
                },
              ],
            };
          } else {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  results: [memeComment, ...page.results],
                };
              }),
            };
          }
        }
      );

      await queryClient.invalidateQueries({
        queryKey: [GET_MEME_COMMENT_QUERY_KEY, { memeId }],
      });
    },
  });

  const handleSubmit = formContext.handleSubmit(async (data) => {
    await mutate({
      memeId,
      content: data.content,
    });
    formContext.resetField('content');
  });

  return { handleSubmit, isCreateMemeCommentPending: isPending, formContext };
};
