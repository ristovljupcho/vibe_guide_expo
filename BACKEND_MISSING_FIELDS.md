# Backend Fields Missing For Current Frontend

This file lists frontend-relevant fields or API capabilities that are not present in the current backend contract, based on the existing Expo app.

## Place Discovery / Cards

### Missing from place responses

| Frontend need | Where it is used | Current backend status |
| --- | --- | --- |
| `distance` | Explore cards, saved cards, map overlay | Not present in `PlacePreviewResponseDTO` or `PlaceResponseDTO` |
| `mapPosition` or coordinates (`latitude`, `longitude`) | Home map overlay | Not present in `place` table or place DTOs |
| Cover image in preview DTO | Home/explore cards | `GET /places` does not return image URL, only full detail has `imageUrls` |

### Recommended additions

- Add `coverImageUrl` to `PlacePreviewResponseDTO`
- Add `latitude` and `longitude` to `place`
- Optionally add computed `distance` in place list endpoints when user location is available

## Events

### Missing from event responses

| Frontend need | Where it is used | Current backend status |
| --- | --- | --- |
| Event category/type (for example `DJ`, `Live Music`, `Party`) | Event badges and event filtering screen | Not present in `event` table or `EventResponseDTO` |
| Stable primary image on event row itself | Event list and cards | Current contract implies image comes from gallery; `EventResponseDTO` has `imageUrl`, which is good, but `event` table itself does not include it |

### Recommended additions

- Add `event_type` enum column to `event`
- Keep `imageUrl` in `EventResponseDTO`

## Offers

### Missing from offer responses

| Frontend need | Where it is used | Current backend status |
| --- | --- | --- |
| Offer badge / promo label (for example `2-for-1`, `-20%`) | Offer cards | Not present in `offer` table or `OfferResponseDTO` |

### Recommended additions

- Add `badge_label` or `promo_label` to `offer`

## Saved / Wishlist / Favorites / Visited

### Missing from saved-place responses

| Frontend need | Where it is used | Current backend status |
| --- | --- | --- |
| Image URL | Saved tab cards and modal | Not present in favourite/wishlist/visited DTOs |
| Address | Saved tab cards and modal | Not present in favourite/wishlist/visited DTOs |
| Place type | Saved tab cards and modal | Not present in favourite/wishlist/visited DTOs |
| Price level | Saved tab cards and modal | Not present in favourite/wishlist/visited DTOs |
| Traits | Saved tab cards and modal | Not present in favourite/wishlist/visited DTOs |
| User rating for that place | Saved tab modal | Not present in saved DTOs |

### Recommended additions

- Enrich saved-place DTOs with:
  - `imageUrl`
  - `address`
  - `primaryType`
  - `priceLevel`
  - `topTraits`
  - `userRating`

## Profile

### Missing from user contract

| Frontend need | Where it is used | Current backend status |
| --- | --- | --- |
| Phone number | Profile/edit profile screen | Not present in `user_table` |
| Bio | Profile/edit profile screen | Not present in `user_table` |
| Profile image/avatar | Profile screen | Not present in `user_table` |
| Aggregated stats | Profile screen | No endpoint in provided contract |

### Recommended additions

- Add optional user profile fields:
  - `phone_number`
  - `bio`
  - `avatar_url`
- Add an endpoint for profile aggregates:
  - saved count
  - visited count
  - reviews count
  - events attended or saved

## Notes

- External image URLs are already compatible with the Expo frontend. The app renders remote URLs directly with `expo-image`.
- The frontend currently derives some missing data locally as a fallback, but the items above would let it rely on backend data cleanly.
