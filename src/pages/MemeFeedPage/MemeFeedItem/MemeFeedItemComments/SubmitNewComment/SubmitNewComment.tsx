import { FC } from 'react';
import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { useUserId } from '@/contexts/authentication.tsx';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { useCreateMemeComment } from './hooks/useCreateMemeComment.ts';
import { IoMdSend } from 'react-icons/io';

interface SubmitNewCommentProps {
  memeId: string;
}

export const SubmitNewComment: FC<SubmitNewCommentProps> = ({ memeId }) => {
  const userId = useUserId();
  const { handleSubmit, isCreateMemeCommentPending, formContext } = useCreateMemeComment({ memeId });

  const { register } = formContext;

  return (
    <Box mb={6}>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center">
          <UserAvatar userId={userId} size="sm" mr={2} />

          <Input placeholder="Type your comment here..." {...register('content')} />
          <IconButton type="submit" variant="solid" aria-label="Send" isLoading={isCreateMemeCommentPending}>
            <IoMdSend />
          </IconButton>
        </Flex>
      </form>
    </Box>
  );
};
