# Arcana Forge

A dependency-free fantasy character builder for 2014 5e and revised 2024 5e rules.

## Highlights

- Guided character creation, direct editing, level-up, and delevel workflows
- Source-aware class, subclass, spell, feat, fighting-style, species, and background catalogs
- Correct 2014 species ability bonuses with variant and flexible selections
- Correct 2024 background ability selections and automatically granted Origin feats
- 2024 feat ability increases with feat-specific choices and Epic Boon limits
- Automatic modifiers, proficiency, AC, HP, initiative, passive Perception, and spell math
- Class and subclass features listed at the levels where they are gained
- Resource tracking for spell slots, class uses, hit dice, and point pools
- Searchable equipment, inventory, currency, carried weight, and attunement
- Built-in rolls, roll history, portraits, import, and export
- Email/password cloud accounts with local fallback
- Per-account character synchronization through Supabase Row Level Security
- Conflict-aware cloud deletion and automatic refresh when returning online
- Built-in catalogs for all players, with separate Homebrew fields for custom options
- Responsive desktop and mobile interface

## Run Locally

No install or build step is required. Open `index.html` directly or serve this folder:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy With GitHub Pages

1. Create a public GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Push to the `main` branch.
4. The included `.github/workflows/pages.yml` workflow enables Pages and deploys the site.

GitHub will publish it at `https://YOUR-NAME.github.io/REPOSITORY/`.

## Enable Cloud Accounts

1. Create a Supabase project.
2. Open its SQL editor and run `supabase-schema.sql`.
3. Enable email/password sign-in in Authentication settings.
4. Add the public site URL to the Authentication URL configuration.
5. In the GitHub repository, open **Settings > Secrets and variables > Actions > Variables**.
6. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
7. Redeploy the Pages workflow. The workflow writes the public values into `cloud-config.js` during deployment.

For local development, the same public values can be placed directly in `cloud-config.js`. The publishable key is intended for browser use. Never use a Supabase secret or service-role key. Arcana Forge retains a local copy, merges newer cloud rows after sign-in, keeps deletion tombstones so stale devices cannot restore removed characters, and relies on Row Level Security so users can access only their own characters.

Cloudflare Pages, Netlify, and Vercel can also host this static folder.

## Content And Licensing

The project does not copy D&D Beyond branding or artwork. Open rules content is drawn from SRD 5.1 and SRD 5.2.1 under CC BY 4.0, with attribution included in the app. Every catalog option is available without purchase or ownership gates. Non-SRD entries use concise original summaries rather than reproducing commercial sourcebook text.

Product names and trademarks belong to their respective owners. Arcana Forge is independent and is not endorsed by Wizards of the Coast.
