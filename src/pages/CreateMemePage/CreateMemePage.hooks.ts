import { CreateMemeFormValues } from '@/pages/CreateMemePage/CreateMemePage.types.ts';
import { useForm } from 'react-hook-form';
import { Service } from '@/api';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { GET_MEMES_QUERY_KEY } from '@/pages/MemeFeedPage/hooks/useGetMemes.ts';
import { Meme } from '@/api/api.ts';

export const useCreateMemePage = () => {
  const formContext = useForm<CreateMemeFormValues>();
  const { handleSubmit } = formContext;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCreateMeme = handleSubmit(async (data) => {
    const meme = await Service.createMeme({
      description: data.description,
      picture: data.picture,
      texts: data.texts,
    });

    queryClient.setQueryData<{ pages: { results: Meme[] }[] }>(
      [GET_MEMES_QUERY_KEY],
      (oldData) => {
        if (!oldData) {
          return {
            pages: [
              {
                results: [meme],
              },
            ],
          };
        } else {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                results: [meme, ...page.results],
              };
            }),
          };
        }
      }
    );

    navigate({
      to: '/',
    });
  });

  return {
    handleCreateMeme,
    formContext,
  };
};
