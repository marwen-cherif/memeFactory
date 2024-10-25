import { FC } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { Image } from '@phosphor-icons/react';

export const NoPictureDisplay: FC = () => {
  return (
    <Flex
      flexDir="column"
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={Image} color="black" boxSize={16} />
      <Text>Select a picture</Text>
      <Text color="gray.400" fontSize="sm">
        or drop it in this area
      </Text>
    </Flex>
  );
};
