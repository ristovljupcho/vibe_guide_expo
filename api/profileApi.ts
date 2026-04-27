import { encodePathSegment, fetchJson, getDefaultUserId } from './apiClient';
import type { HelpSupportContent, Profile, UserTableDto } from './types';

function buildInitials(name: string) {
  const nameParts = name.split(' ').filter(Boolean);

  if (nameParts.length >= 2) {
    return `${nameParts[0][0] ?? ''}${nameParts[1][0] ?? ''}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export async function getProfileData(): Promise<Profile | null> {
  const remoteUser = await fetchJson<UserTableDto>(
    `/users/${encodePathSegment(getDefaultUserId())}`,
    undefined,
    { suppressErrors: true },
  );

  if (!remoteUser) {
    return null;
  }

  return {
    initials: buildInitials(remoteUser.name),
    fullName: remoteUser.name,
    username: `@${remoteUser.username}`,
    email: remoteUser.email,
    phone: '',
    location: '',
    bio: '',
    stats: [],
  };
}

export async function getHelpSupportContent(): Promise<HelpSupportContent> {
  return {
    contactOptions: [],
    faqItems: [],
    quickLinks: [],
  };
}
