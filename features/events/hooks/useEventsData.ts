import { useQuery } from '@tanstack/react-query';

import { getEventsPaginated } from '@/api/eventApi';

interface EventsQueryParams {
  placeName?: string;
  startDate?: string;
  endDate?: string;
  page: number;
}

export function useEventsData(params: EventsQueryParams) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => getEventsPaginated(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}
