# Project screenshots

Project cards stay text-first until there is a real screenshot to show; article artwork is not used as a stand-in for an app preview.

To add an authentic preview:

1. Capture the project itself at a useful desktop or mobile size. Avoid mock browser frames or generated interface imagery.
2. Save the image under `public/projects/`, for example `public/projects/mynaga-crud.jpg`.
3. Set the matching project's `image` value in `src/app/lib/projects.ts` to `/projects/mynaga-crud.jpg`.

The Projects component renders the image only when that field is set. Keep the alt text descriptive and use screenshots that you have permission to publish.
