import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'src/lib/fetcher';

import type { ServiceGroup } from 'src/types/services';

export const useServices = () => {
  const { data, mutate } = useSWR<ServiceGroup[]>('/api/services', fetcher, {
    onError(e) {
      console.error(e);
    }
  });

  return {
    servicesData: useMemo(() => data, [data]),
    update: () => mutate()
  };
};
