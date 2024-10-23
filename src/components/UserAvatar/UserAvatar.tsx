import { FC, Suspense } from 'react';

import { UserAvatarContent } from './UserAvatarContent.tsx';
import { SkeletonCircle } from '@chakra-ui/react';

interface UserAvatarContentProps {
  userId: string;
  size?: 'xs' | 'sm';
  mr?: number;
}

export const UserAvatar: FC<UserAvatarContentProps> = ({ userId, size, mr }) => {
  return (
    <Suspense fallback={<SkeletonCircle size="10" />}>
      <UserAvatarContent userId={userId} size={size} mr={mr} />
    </Suspense>
  );
};
