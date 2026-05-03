import { useQuery } from '@tanstack/react-query';

import { getProfileData } from '@/api/profileApi';

export function useProfileData() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
    staleTime: 10 * 60 * 1000,
  });
}
