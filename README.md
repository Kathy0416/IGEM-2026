# iGEM TeamName Wiki

This branch is migrating the original static **Strength Over Time** website to
the official 2026 iGEM React/Vite structure. The previous implementation is
preserved in [`legacy-static/`](legacy-static/) until every page has been
ported and visually verified.

This repository uses `TypeScript` and `React` to manage the wikis.

This repository **MUST** contain all coding assets to generate your team's wiki
(HTML, CSS, JavaScript, TypeScript, Python, etc).

Images, photos, icons and fonts **MUST** be stored on `static.igem.wiki` using
[the uploads tool](https://teams.igem.org/go/deliverables/wiki/uploads), and Videos **must** be embedded
from [iGEM Video Universe](https://video.igem.org); see [the Video & Audio page](https://teams.igem.org/go/deliverables/wiki/videos-and-audios) for guidance on adding video and audio.

**Everything your wiki loads (CSS, JavaScript, fonts, images) must be served from
iGEM infrastructure.** Do not link to external or third-party CDNs (for example
Google Fonts, jsDelivr, cdnjs) — upload the files you need via
[the uploads tool](https://teams.igem.org/go/deliverables/wiki/uploads) and reference them from `static.igem.wiki`
instead.

For up-to-date requirements, resources, help and guidance, visit
[teams.igem.org/go/deliverables/wiki](https://teams.igem.org/go/deliverables/wiki).

> **Using an AI assistant (e.g. Claude Code)?** Please read
> [.claude/RESPONSIBLE_AI_USE.md](.claude/RESPONSIBLE_AI_USE.md) first. You remain
> fully responsible for everything you publish: never fabricate scientific
> results, data, or citations.

## Getting Started

Before refactoring the code of this template to suit your wiki needs, please make sure you have the ability to use React
for web development.

1. Clone the repository:
   ```bash
   git clone https://gitlab.igem.org/templates/wiki-react-vite
   cd wiki-react-vite
   ```
2. Install the dependencies:

   ```bash
   yarn install
   ```

   ### Important:

   Ensure you are using Node.js version `>=20.19.0` (Node 22 LTS recommended) to avoid compatibility issues.
   You can check your Node version by running `node -v` in your terminal.

3. Start the development server:
   ```bash
   yarn run dev
   ```

   During migration, open `http://localhost:5173/teamname/`. The `/teamname/`
   prefix mirrors the path used by the iGEM deployment environment.
4. Navigate to the files you wish to edit:
   - The main App component can be found under `src/containers/App`
   - Pre-built components are located under `src/components`
   - Individual pages can be modified in the `src/pages.ts`
   - Content pages can be updated in the `src/contents`
5. Once you are done, save the changes by **committing** them to the _main branch_ of the repository
6. An automated script will build, test and deploy your wiki to the iGEM server

## Local Development Workflow

Enable Corepack once, then use the Yarn version pinned by this repository:

```bash
corepack enable
yarn install --frozen-lockfile
yarn dev
```

On Windows PowerShell, if `yarn` is not yet available as a direct command, use
Corepack without changing the system execution policy:

```powershell
corepack.cmd yarn install --frozen-lockfile
corepack.cmd yarn dev
```

Before opening a pull request, run:

```bash
yarn lint
yarn build
```

The first migrated page is available at `/teamname/problem`. Page-specific
styles live beside their components so UI contributors can work without
changing unrelated pages:

```text
src/contents/problem.tsx
src/contents/problem.css
```

## Docker Preview

Build and run the production preview:

```bash
docker build -t igem-wiki .
docker run --rm -p 8080:80 igem-wiki
```

Open `http://localhost:8080/teamname/`.

Before official deployment, replace `TeamName` in `.env` with the exact iGEM
team name. Update the `teamname` path in `Dockerfile` and
`nginx/default.conf` to the resulting lowercase slug as well.

The three timeline icons currently under `public/assets/icons/` are temporary
local-preview copies. Upload them through the iGEM uploads tool and replace
their URLs before the wiki freeze.

## About This Template

### Files

Below is the structure of important files and directories in this project:

    ├── README.md            -> The file you are currently reading
    ├── index.html           -> Single HTML file for the wiki
    ├── package.json         -> Manages project metadata and dependencies
    ├── src/
    │   ├── components/      -> Pre-built components(like Navbar, Footer, etc.)
    │   ├── containers/
    │   │   └── App/         -> Main React application container
    │   ├── contents/
    │   │   └── *.tsx        -> Page components for the wiki
    │   ├── main.tsx         -> Entry point of the wiki application
    │   ├── pages.ts         -> Page definition and path mapping
    │   ├── utils/           -> Utility functions
    │   └── vite-env.d.ts    -> TypeScript definitions for Vite
    ├── tsconfig.json        -> Configures TypeScript options
    ├── tsconfig.node.json   -> TypeScript settings for Node.js
    ├── vite.config.ts       -> Configuration for the Vite tool
    └── yarn.lock            -> Yarn lock file for dependency management

### Technologies

- [React](https://reactjs.org): A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org): Extends JavaScript by adding types
- [Vite](https://vitejs.dev): Frontend tooling that provides faster and leaner development builds
- [Bootstrap](https://getbootstrap.com): Framework for building responsive, mobile-first sites
- [React Bootstrap](https://react-bootstrap.github.io): Bootstrap components built with React
- [React Router](https://reactrouter.com): Declarative routing for React applications
- (Optional) [Prettier](https://prettier.io): Code formatter
