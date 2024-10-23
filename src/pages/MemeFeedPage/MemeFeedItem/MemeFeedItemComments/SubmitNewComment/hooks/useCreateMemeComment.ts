import { useMutation } from '@tanstack/react-query';
import { Service } from '@/api';
import { useForm } from 'react-hook-form';

export const useCreateMemeComment = ({ memeId }: { memeId: string }) => {
  const formContext = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { memeId: string; content: string }) => {
      await Service.createMemeComment(data.memeId, data.content);
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
