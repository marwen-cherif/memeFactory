import { FC } from 'react';
import { useAuthentication } from '../contexts/authentication.tsx';
import { Button, Flex, Heading, HStack, Icon, StackDivider } from '@chakra-ui/react';
import { Link, Outlet } from '@tanstack/react-router';
import { Plus } from '@phosphor-icons/react';
import { UserDropdown } from './UserDropdown.tsx';

export const Layout: FC = () => {
  const { state } = useAuthentication();
  return (
    <Flex width="full" height="full" direction="column">
      {/* Header */}
      <Flex bgColor="cyan.600" p={2} justifyContent="space-between" boxShadow="md">
        {/* Title */}
        <Heading size="lg" color="white">
          MemeFactory
        </Heading>
        {state.isAuthenticated && (
          <HStack alignItems="center" divider={<StackDivider border="white" />}>
            <Button as={Link} size="sm" leftIcon={<Icon as={Plus} />} to="/create">
              Create a meme
            </Button>
            <UserDropdown />
          </HStack>
        )}
      </Flex>
      <Flex flexGrow={1} height={0}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
