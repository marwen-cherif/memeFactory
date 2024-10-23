import { Menu, MenuButton, MenuList, MenuItem, Icon, Flex } from '@chakra-ui/react';
import { CaretDown, CaretUp, SignOut } from '@phosphor-icons/react';
import { useAuthentication } from '../contexts/authentication';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { UserDisplayName } from '@/components/UserDisplayName/UserDisplayName.tsx';

export const UserDropdown: React.FC = () => {
  const { state, signout } = useAuthentication();

  if (!state.isAuthenticated) {
    return null;
  }

  const userId = state.userId;

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton>
            <Flex direction="row" alignItems="center">
              <UserAvatar userId={userId} size="xs" mr={2} />
              <UserDisplayName userId={userId} />
              <Icon color="white" ml={2} as={isOpen ? CaretUp : CaretDown} mt={1} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={SignOut} />} onClick={signout}>
              Sign Out
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
