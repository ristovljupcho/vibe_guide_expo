import { encodePathSegment, fetchJson } from './apiClient';
import { buildTraitFilters } from './apiUtils';
import type { FilterCategory, TraitCarouselResponseDto, TraitResponseDto } from './types';

interface TraitsPage {
  content: TraitResponseDto[];
  last?: boolean;
  totalPages?: number;
  number?: number;
}

const TRAITS_PAGE_SIZE = 100;
// Defensive ceiling: stop after this many pages even if `last` is missing/incorrect.
const TRAITS_MAX_PAGES = 50;

export async function getTopTraits(placeId: string) {
  return (
    (await fetchJson<TraitResponseDto[]>(`/places/${encodePathSegment(placeId)}/top-traits`)) ?? []
  );
}

async function fetchAllTraits(): Promise<TraitResponseDto[] | null> {
  const collected: TraitResponseDto[] = [];

  for (let page = 0; page < TRAITS_MAX_PAGES; page += 1) {
    const result = await fetchJson<TraitsPage>('/traits/paginated', {
      page,
      size: TRAITS_PAGE_SIZE,
    });

    if (!result?.content) {
      return page === 0 ? null : collected;
    }

    collected.push(...result.content);

    const reachedEnd =
      result.last === true ||
      result.content.length < TRAITS_PAGE_SIZE ||
      (typeof result.totalPages === 'number' && page + 1 >= result.totalPages);

    if (reachedEnd) {
      break;
    }
  }

  return collected;
}

export async function getExploreFilters(): Promise<FilterCategory[]> {
  const paginated = await fetchAllTraits();

  if (paginated && paginated.length > 0) {
    return buildTraitFilters(paginated);
  }

  const traits = await fetchJson<TraitCarouselResponseDto[]>('/traits');
  if (!traits) {
    return [];
  }

  return [
    {
      name: 'Traits',
      options: Array.from(new Set(traits.map((trait) => trait.name).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b),
      ),
    },
  ];
}

export async function getTraitCategories() {
  return getExploreFilters();
}

export async function getQuickFilterNames() {
  const traits = await fetchJson<TraitCarouselResponseDto[]>('/traits');
  return Array.from(new Set((traits ?? []).map((trait) => trait.name).filter(Boolean))).slice(0, 8);
}
