import { FC } from 'react';
import { Box, Collapse, Flex, Text, VStack } from '@chakra-ui/react';
import { format } from 'timeago.js';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { UserDisplayName } from '@/components/UserDisplayName/UserDisplayName.tsx';

import { useGetMemeComments } from './hooks/useGetMemeComments.ts';
import { SubmitNewComment } from './SubmitNewComment/SubmitNewComment.tsx';

interface MemeFeedItemCommentsProps {
  isOpen: boolean;
  memeId: string;
}

export const MemeFeedItemComments: FC<MemeFeedItemCommentsProps> = ({ memeId, isOpen }) => {
  const { memeComments } = useGetMemeComments({ memeId });

  return (
    <Collapse in={isOpen} animateOpacity>
      <SubmitNewComment memeId={memeId} />

      <VStack align="stretch" spacing={4}>
        {memeComments.map((comment) => (
          <Flex key={comment.id}>
            <UserAvatar userId={comment.authorId} size="sm" mr={2} />

            <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex>
                  <UserDisplayName
                    userId={comment.authorId}
                    dataTestId={`meme-comment-author-${memeId}-${comment.id}`}
                  />
                </Flex>
                <Text fontStyle="italic" color="gray.500" fontSize="small">
                  {format(comment.createdAt)}
                </Text>
              </Flex>

              <Text color="gray.500" whiteSpace="pre-line" data-testid={`meme-comment-content-${memeId}-${comment.id}`}>
                {comment.content}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Collapse>
  );
};

MemeFeedItemComments.displayName = 'MemeFeedItemComments';
