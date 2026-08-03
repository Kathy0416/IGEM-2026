# Worldshaper-Nanjing iGEM 2026 Wiki

React 19, TypeScript, and Vite source for Worldshaper-Nanjing's 2026 iGEM wiki,
**Strength Over Time**.

## Development

```bash
corepack yarn install --frozen-lockfile
corepack yarn dev
```

The local base path mirrors iGEM deployment:

```text
http://localhost:5173/worldshaper-nanjing/
```

Run the complete development check with:

```bash
corepack yarn verify
```

`yarn audit:compliance` permits clearly marked draft placeholders while reporting
their count. Before publication, `yarn audit:strict` must pass with no
placeholders and with the official team ID configured.

## Content policy

- Do not fabricate results, statistics, citations, quotations, names, or
  attributions.
- Record content provenance in [`CONTENT_SOURCES.md`](CONTENT_SOURCES.md).
- Host runtime images and fonts on `static.igem.wiki`.
- Embed videos from iGEM Video Universe.
- Do not load runtime assets, scripts, analytics, or widgets from third-party
  services.
- Obtain consent before publishing personal information, portraits, or
  stakeholder quotations.

## Deployment

GitHub may be used during development. The verified source must eventually be
pushed to Worldshaper-Nanjing's official iGEM GitLab repository so its default
branch pipeline can build and deploy the wiki. Do not publish only the compiled
`dist` directory.

The official repository URL and `VITE_TEAM_ID` are deliberately left pending
until the team provides them. Never commit access tokens or credentials.

All wiki content is licensed under CC BY 4.0. The required license and official
repository link are rendered in the footer on every route.
