import { FC, Suspense } from 'react';

import { UserDisplayNameContent } from './UserDisplayNameContent.tsx';
import { SkeletonText } from '@chakra-ui/react';

interface UserAvatarContentProps {
  userId: string;
  dataTestId?: string;
  ml?: number;
}

export const UserDisplayName: FC<UserAvatarContentProps> = ({ userId, dataTestId, ml }) => {
  return (
    <Suspense fallback={<SkeletonText ml={ml} />}>
      <UserDisplayNameContent userId={userId} dataTestId={dataTestId} ml={ml} />
    </Suspense>
  );
};
