import { FC } from 'react';
import { Avatar } from '@chakra-ui/react';
import { useGetUserById } from '@/hooks/useGetUserById.ts';

interface UserAvatarContentProps {
  userId: string;
  size?: 'xs' | 'sm';
  mr?: number;
}

export const UserAvatarContent: FC<UserAvatarContentProps> = ({ userId, size = 'xs', mr }) => {
  const { user } = useGetUserById({ userId });

  return (
    <Avatar borderWidth="1px" borderColor="gray.300" size={size} mr={mr} name={user.username} src={user.pictureUrl} />
  );
};

UserAvatarContent.displayName = 'UserAvatarContent';
