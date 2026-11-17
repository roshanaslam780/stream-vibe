# StreamVibe

StreamVibe is a React and Vite streaming catalog UI powered by TMDB.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `VITE_TMDB_READ_ACCESS_TOKEN` to a TMDB API read access token.
3. Start the app with `npm run dev`.

The token is supplied at build time and is visible to browser users. For a deployed application that needs to keep the credential private, route TMDB requests through a server side proxy.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build.
