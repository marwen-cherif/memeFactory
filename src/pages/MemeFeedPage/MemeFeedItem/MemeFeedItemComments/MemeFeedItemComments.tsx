import { FC, useState } from 'react';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { format } from 'timeago.js';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { UserDisplayName } from '@/components/UserDisplayName/UserDisplayName.tsx';

import { useGetMemeComments } from './hooks/useGetMemeComments.ts';
import { SubmitNewComment } from './SubmitNewComment/SubmitNewComment.tsx';
import { Loader } from '@/components/Loader.tsx';
import { CaretDown, CaretUp, Chat } from '@phosphor-icons/react';

interface MemeFeedItemCommentsProps {
  memeId: string;
}

export const MemeFeedItemComments: FC<MemeFeedItemCommentsProps> = ({
  memeId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { memeComments, lastElementRef, isFetchingNextPage, commentsCount } =
    useGetMemeComments({ memeId });

  return (
    <>
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${memeId}`}
              cursor="pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Text data-testid={`meme-comments-count-${memeId}`}>
                {commentsCount} comments
              </Text>
            </LinkOverlay>
            <Icon as={isOpen ? CaretDown : CaretUp} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>

      <Collapse in={isOpen} animateOpacity>
        <SubmitNewComment memeId={memeId} />

        <VStack align="stretch" spacing={4} maxHeight="250px" overflowY="auto">
          {memeComments.map((comment) => (
            <Flex key={comment.id} ref={lastElementRef}>
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

                <Text
                  color="gray.500"
                  whiteSpace="pre-line"
                  data-testid={`meme-comment-content-${memeId}-${comment.id}`}
                >
                  {comment.content}
                </Text>
              </Box>
            </Flex>
          ))}
          {isFetchingNextPage && <Loader data-testid="meme-comments-loader" />}
        </VStack>
      </Collapse>
    </>
  );
};

MemeFeedItemComments.displayName = 'MemeFeedItemComments';
