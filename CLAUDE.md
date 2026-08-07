# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tourism portal for Karachay-Cherkessia (Карачаево-Черкесия). A Vite + React 18 SPA with two parts served from one build: a public Russian-language tourism site and a `react-admin` content-management panel. All UI text and code comments are in Russian.

There is no backend in this repo. The app talks to an external REST API (`backend.kch-tourism.ru`) configured through `.env`.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # eslint (js,jsx), --max-warnings 0
```

There is no test suite. Formatting is Prettier-enforced: **tabs**, single quotes, no semicolons, no trailing commas, `arrowParens: avoid`, printWidth 80. Imports are auto-sorted by `@trivago/prettier-plugin-sort-imports` (third-party first, then relative `../` then `./`, with blank-line separation) — preserve that grouping when editing imports.

## Environment

`.env` (gitignored) provides two Vite vars, re-exported from `src/serverConfig.js`:
- `VITE_API` → `API` — REST base, e.g. `https://backend.kch-tourism.ru/api`
- `VITE_UPLOAD` → `UPLOAD` — base for uploaded-asset URLs and upload endpoints (no `/api`)

Stored asset paths from the API are relative; prefix them with `UPLOAD` to render (`image.includes('http') ? image : ` + `${UPLOAD}${image}`).

## Architecture

**Two apps, one router** (`src/App.jsx`):
- Public routes render under `<Layout>` (`Header` + `<Outlet/>` + `Footer`). Exception: `MainPage` is the index route rendered *outside* `Layout` and supplies its own `HeaderAbs`/`Footer`.
- `/admin/*` mounts `AdminPage`, a self-contained `react-admin` `<Admin basename='/admin'>` app.

**Backend contract is `ra-data-simple-rest`.** Lists use query params `range`/`sort`/`filter` (JSON-stringified) and read the total from the `Content-Range` response header. The admin panel gets this for free via `simpleRestProvider`. Public pages replicate the same convention **by hand with axios** — see `NewsPage.jsx` (`fetchNews`, `parseTotalFromContentRange`) as the pattern to copy for any paginated public list.

**Auth.** JWT stored in cookie `token` via `js-cookie`, expires 10 days. Every authed request sends `Authorization: Bearer <token>` — public pages/blocks read the cookie with `src/getToken.js`, the admin data provider through `fetchJsonWithToken`. The admin login flow is react-admin's `authProvider.js` (login/logout/checkAuth; `checkError` clears the cookie on 401/403) wired via `LoginPage.jsx`. Note: `src/AuthContext.jsx` and `Pages/Admin/Auth/Auth.jsx` are an orphaned alternative login — `AuthProvider` is never mounted and `Auth` is not routed; don't extend them, use the `authProvider`/`getToken` path.

**File uploads are decoupled from the data provider** (`src/Components/Pages/Admin/JS/fileUploadUtils.js`). Images/videos/docs POST to separate endpoints (`/uploads`, `/upload-video`, `/upload-doc`) and return URL strings. CRUD forms wire this through react-admin's `transform` prop (`handleSave`, `handleSaveWithImages`, `handleSaveWithDocs`, and combined variants) so raw `File` objects are swapped for URLs *before* the record is saved. Edit forms keep two inputs per media type — a `*Raw` input for new uploads and the existing field (with `format`/`parse`) for already-saved URLs.

**Admin resources reuse CRUD components.** In `AdminPage.jsx`, several resources (`visit`, `news`, `projects`) all point at `NewsList/NewsEdit/NewsCreate`. They differ only by resource `name` (the API path) and label. When changing the News CRUD, remember it drives multiple resources.

## Component layout

Each component lives in its own folder, almost always as `Name.jsx` + `Name.module.css` (CSS Modules; no global styling system; wrappers like `Layout/` and the `Pages/Admin/` root carry no CSS). Three tiers under `src/Components/`:
- `Standart/` — layout primitives: `CenterBlock`, `WidthBlock`, `RowBlock`, `ColumnBlock`, `H1`/`H2`/`Text`, `Button`, `Layout`. These take style props (width, gap, background, padding…) and apply them inline. Compose pages from these rather than writing bespoke wrappers.
- `Blocks/` — reusable sections (Header, Footer, NewsBlock, EventsBlock, Feedback, Calculator, StoryViewer, etc.).
- `Pages/` — one folder per route; `Pages/Admin/` holds the react-admin app (`CRUD/` for resource forms, `JS/` for providers and upload utils).

**Accessibility (BVI / версия для слабовидящих).** `Blocks/BVI` and `Blocks/BVIStyles` inject an external screen-reader script/styles from `lidrekon.ru`. These hooks are currently commented out at their call sites (`Layout.jsx`, `MainPage.jsx`) — check there before assuming the feature is active.

## Deployment

Static build (`dist/`) served by Apache. `.htaccess` rewrites all non-file requests to `index.html` for SPA client-side routing. `index.html` loads Montserrat (Google Fonts) and jQuery from CDNs, and sets the app to `<html lang="ru">`.

## Работа с кодом

- Чистый, читаемый, эффективный, поддерживаемый код. Без оверинжиниринга и лишних абстракций.
- Только функциональные компоненты. Компоненты маленькие, одна ответственность. Логика в хуках/утилитах, UI отдельно.
- Понятные и единообразные названия.
- Перед созданием нового компонента проверь, нет ли похожего. Не дублируй логику — переиспользуй.
- Не вводи новые зависимости без явной необходимости.
- Всегда анализируй существующую структуру, стиль, паттерны и архитектуру проекта перед тем как писать код, и строго следуй им.

## Визуальный стиль

- Анализируй существующие компоненты, цвета, шрифты, отступы и паттерны, строго следуй им во всех новых элементах.
- Не вноси визуальные изменения, если об этом не просят.

## Взаимодействие

- Не объясняй что делаешь — просто делай. Без лишних комментариев в коде и резюме после выполнения.
- Если задача понятна — не переспрашивай. Думай на английском, отвечай на русском.

## Git

- Не трогай git сам: ничего не коммить, не пуш, не создавай ветки, не меняй состояние репозитория. Все git-операции пользователь делает сам.
- Git можно использовать только на чтение (`git status`, `git log`, `git diff` и т.п.).
- Когда пользователь просит — предлагай краткое сообщение коммита на английском (текст, не команду выполнения).

## Notes

- `data.js` (~450KB at repo root) holds legacy hardcoded content (e.g. `contacts`). Most page-content imports from it are commented out because that content moved to the API — treat it as mostly-dead legacy data, not the source of truth.
