import { ReactNode, Suspense } from 'react';

import { Loader } from '@components/common';

interface WithSuspenseProps {
  children: ReactNode;
}

function WithSuspense({ children }: WithSuspenseProps) {
  return <Suspense fallback={<Loader isFullScreen />}>{children}</Suspense>;
}

export default WithSuspense;
