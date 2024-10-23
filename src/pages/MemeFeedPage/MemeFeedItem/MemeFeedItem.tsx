import { FC, useState } from 'react';
import { Box, Flex, Icon, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { format } from 'timeago.js';
import { MemePicture } from '@/components/MemePicture.tsx';
import { CaretDown, CaretUp, Chat } from '@phosphor-icons/react';
import { Meme } from '@/api/api.ts';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { UserDisplayName } from '@/components/UserDisplayName/UserDisplayName.tsx';
import { MemeFeedItemComments } from './MemeFeedItemComments/MemeFeedItemComments.tsx';

interface MemeFeedItemProps {
  meme: Meme;
}

export const MemeFeedItem: FC<MemeFeedItemProps> = ({ meme }) => {
  const [openedCommentSection, setOpenedCommentSection] = useState<string | null>(null);

  return (
    <VStack key={meme.id} p={4} width="full" align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <UserAvatar userId={meme.authorId} />
          <UserDisplayName userId={meme.authorId} dataTestId={`meme-author-${meme.id}`} ml={2} />
        </Flex>
        <Text fontStyle="italic" color="gray.500" fontSize="small">
          {format(meme.createdAt)}
        </Text>
      </Flex>

      <MemePicture pictureUrl={meme.pictureUrl} texts={meme.texts} dataTestId={`meme-picture-${meme.id}`} />

      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:{' '}
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text color="gray.500" whiteSpace="pre-line" data-testid={`meme-description-${meme.id}`}>
            {meme.description}
          </Text>
        </Box>
      </Box>

      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${meme.id}`}
              cursor="pointer"
              onClick={() => setOpenedCommentSection(openedCommentSection === meme.id ? null : meme.id)}
            >
              <Text data-testid={`meme-comments-count-${meme.id}`}>{meme.commentsCount} comments</Text>
            </LinkOverlay>
            <Icon as={openedCommentSection !== meme.id ? CaretDown : CaretUp} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>

      <MemeFeedItemComments isOpen={openedCommentSection === meme.id} memeId={meme.id} />
    </VStack>
  );
};
