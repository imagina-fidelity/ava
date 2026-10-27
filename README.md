# AVA

imagina's AI colleague, for the atlas.imagina.au ecosystem. Standalone Next.js app at `ava.imagina.au`, launched from the portal's app grid (`APP_CATALOG` in `portal-imagina/lib/apps.ts`). The approved design lives in `../ava-mockup/index.html`.

## Access

Staff sign in once at the portal (shared SSO cookie). What a person can do comes from their `ava` level in the shared EM `effective_app_access` view, read live per request (`lib/permissions.ts`):

- **View**: chat with AVA.
- **Edit**: also manage what AVA knows.
- **None**: no access. The proxy sends them back to the portal.

## Setup

Copy `.env.local.example` to `.env.local` and fill it in (`NPM_TOKEN` needs `read:packages` for `@fidelity-imagina/auth`), then `npm install && npm run dev`. Set `DEV_BYPASS_AUTH=1` to review locally with no portal or database.
