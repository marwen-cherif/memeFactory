import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { useGetUserById } from '@/hooks/useGetUserById.ts';

interface UserAvatarContentProps {
  userId: string;
  dataTestId?: string;
  ml?: number;
}

export const UserDisplayNameContent: FC<UserAvatarContentProps> = ({ userId, dataTestId, ml }) => {
  const { user } = useGetUserById({ userId });

  return (
    <Text ml={ml} data-testid={dataTestId}>
      {user.username}
    </Text>
  );
};
