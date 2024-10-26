import { CreateMemeFormValues } from '@/pages/CreateMemePage/CreateMemePage.types.ts';
import { useForm } from 'react-hook-form';
import { Service } from '@/api';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { GET_MEMES_QUERY_KEY } from '@/pages/MemeFeedPage/hooks/useGetMemes.ts';
import { Meme } from '@/api/api.ts';
import { yupResolver } from '@hookform/resolvers/yup';

import createMemeFormSchema from './CreateMemePage.schema.ts';
import { toBlob } from 'html-to-image';
import { useCallback, useRef } from 'react';

export const useCreateMemePage = () => {
  const editorPictureRef = useRef<HTMLElement>(null);

  const formContext = useForm<CreateMemeFormValues>({
    resolver: yupResolver(createMemeFormSchema) as never,
  });
  const { handleSubmit } = formContext;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleGetBlob = useCallback(async () => {
    if (editorPictureRef.current) {
      try {
        return await toBlob(editorPictureRef.current, { cacheBust: false });
      } catch (e) {
        console.error(e);

        return undefined;
      }
    }

    return undefined;
  }, [editorPictureRef]);

  const handleCreateMeme = handleSubmit(async (data) => {
    const picture = await handleGetBlob();

    if (!picture) {
      return;
    }

    const meme = await Service.createMeme({
      description: data.description,
      picture: new File([picture], 'meme.png', {
        type: 'image/png',
      }),
      texts: [],
    });

    queryClient.setQueryData<{ pages: { results: Meme[] }[] }>(
      [GET_MEMES_QUERY_KEY],
      (oldData) => {
        if (oldData) {
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

        return oldData;
      }
    );

    navigate({
      to: '/',
    });
  });

  return {
    handleCreateMeme,
    formContext,
    editorPictureRef,
  };
};
