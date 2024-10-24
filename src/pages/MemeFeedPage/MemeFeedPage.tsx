import { FC } from 'react';
import { Loader } from '../../components/Loader.tsx';
import { Flex, StackDivider, VStack } from '@chakra-ui/react';

import { MemeFeedItem } from './MemeFeedItem/MemeFeedItem.tsx';
import { useGetMemes } from './hooks/useGetMemes.ts';

export const MemeFeedPage: FC = () => {
  const { memes, isFetchingNextPage, lastElementRef } = useGetMemes();

  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {memes?.map((meme) => {
          return (
            <MemeFeedItem key={meme.id} meme={meme} ref={lastElementRef} />
          );
        })}

        {isFetchingNextPage && <Loader data-testid="meme-feed-loader" />}
      </VStack>
    </Flex>
  );
};
