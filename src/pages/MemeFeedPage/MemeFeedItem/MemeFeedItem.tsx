import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { format } from 'timeago.js';
import { MemePicture } from '@/components/MemePicture.tsx';
import { Meme } from '@/api/api.ts';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { UserDisplayName } from '@/components/UserDisplayName/UserDisplayName.tsx';
import { MemeFeedItemComments } from './MemeFeedItemComments/MemeFeedItemComments.tsx';

interface MemeFeedItemProps {
  meme: Meme;
}

export const MemeFeedItem = React.forwardRef<HTMLDivElement, MemeFeedItemProps>(
  ({ meme }, forwardRef) => {
    return (
      <VStack key={meme.id} p={4} width="full" align="stretch" ref={forwardRef}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <UserAvatar userId={meme.authorId} />
            <UserDisplayName
              userId={meme.authorId}
              dataTestId={`meme-author-${meme.id}`}
              ml={2}
            />
          </Flex>
          <Text fontStyle="italic" color="gray.500" fontSize="small">
            {format(meme.createdAt)}
          </Text>
        </Flex>

        <MemePicture
          pictureUrl={meme.pictureUrl}
          texts={meme.texts}
          dataTestId={`meme-picture-${meme.id}`}
        />

        <Box>
          <Text fontWeight="bold" fontSize="medium" mb={2}>
            Description:{' '}
          </Text>
          <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
            <Text
              color="gray.500"
              whiteSpace="pre-line"
              data-testid={`meme-description-${meme.id}`}
            >
              {meme.description}
            </Text>
          </Box>
        </Box>

        <MemeFeedItemComments memeId={meme.id} />
      </VStack>
    );
  }
);
