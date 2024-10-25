import { CreateMemeFormValues } from '@/pages/CreateMemePage/CreateMemePage.types.ts';
import { useForm } from 'react-hook-form';
import { Service } from '@/api';
import { useNavigate } from '@tanstack/react-router';

export const useCreateMemePage = () => {
  const formContext = useForm<CreateMemeFormValues>();
  const { handleSubmit } = formContext;

  const navigate = useNavigate();

  const handleCreateMeme = handleSubmit(async (data) => {
    await Service.createMeme({
      description: data.description,
      picture: data.picture,
      texts: data.texts,
    });

    navigate({
      to: '/',
    });
  });

  return {
    handleCreateMeme,
    formContext,
  };
};
