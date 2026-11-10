# API Go organization metadata

Public organization profile: [profile/README.md](profile/README.md).

## Frontend development

Clone this repository as `.github` beside `state`, `bootstrap`, and `ui`. State and Bootstrap use `../.github/scripts/sync-readme-versions.mjs` during builds; UI copies framework bundles from the sibling State and Bootstrap repositories. Install each package’s development dependencies, build State and Bootstrap first, then build UI.

This repository intentionally contains public project information only.
