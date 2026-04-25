# Repository Instructions

## Branch Discipline

- Do all requested work explicitly on the requested git branch for the task.
- Keep changes branch-scoped and task-scoped.
- Do not introduce unrelated local changes.
- Do not introduce unrelated global changes.
- Do not modify files outside the requested task unless they are directly required to complete that task.
- If unrelated local changes are already present, leave them untouched unless the user explicitly asks otherwise.

## Domain Messages And Translations

- User-facing labels, placeholders, action text, and repeated UI copy MUST be defined in the domain message files instead
  of being duplicated inline across components.
- English messages MUST live in `shared/domainMessages/domainMessages_en.json`.
- Macedonian Cyrillic translations MUST live in `shared/domainMessages/domainMessages_mk.json`.
- When adding or changing a message in the English file, add or update the matching Macedonian Cyrillic translation in
  the same change set.
- Both language files MUST keep the same JSON key structure so copy can be switched by locale without component changes.

## Commit Message Standards

Commit grouping rules:

1. If pending changes are all connected and contribute to the same logical change, they SHOULD be grouped into a single
   commit.
2. If pending changes are unrelated or belong to separate logical changes, they MUST be split into multiple commits.
3. A commit SHOULD represent one coherent change that can be understood, reviewed, and reverted independently.

1. Subject line MUST be in imperative mood.
   - Good: `Add favourites toggle endpoint`
   - Bad: `Added favourites toggle endpoint`
2. Subject line MUST start with a capital letter and MUST NOT end with punctuation.
3. Subject line SHOULD be concise and ideally <= 50 characters.
4. If more context is needed, include a body separated by a blank line.
5. Body lines SHOULD wrap at ~72 characters.
6. Body MUST explain the `what` and `why`, not only the `how`.
7. Avoid vague or filler commit messages such as:
   - `fix stuff`
   - `oops`
   - `I think this works`
8. Prefer one logical change per commit.

Preferred structure:

`<type>: <imperative summary>`

Optional body:

- what changed
- why it changed
- impact/risk notes (if relevant)

Suggested commit types:

- `feat` for new functionality
- `fix` for bug fixes
- `refactor` for code restructuring without behavior changes
- `docs` for documentation changes
- `test` for tests
- `chore` for maintenance/non-feature work
