# Getting this onto github.com/nabla2ai

Everything is ready to commit. These are the only steps left.

---

## 0. Make sure the `nabla2ai` account exists

`https://github.com/nabla2ai` is an **account**, not a repository, so it has to
exist before anything can live under it.

- **Personal account** → sign up at <https://github.com/join> with the username `nabla2ai`
- **Organisation** (better if other people will ever need access) → <https://github.com/organizations/plan>, choose Free, name it `nabla2ai`

## 1. The repository name matters

Name the repository **`nabla2ai.github.io`**, exactly.

GitHub treats a repo named `<account>.github.io` as that account's own site and
serves it from the root at **https://nabla2ai.github.io**. Any other name
(e.g. `website`) would put it at `https://nabla2ai.github.io/website/`, and the
paths in `index.html`, `sitemap.xml` and `robots.txt` would all need adjusting.

---

## 2. Restore the deploy workflow *(optional — skip if using method A below)*

One file couldn't be written into this folder automatically: anything under
`.github/` is blocked from being written by remote tools, as a safety measure.
If you want the GitHub Actions deployment, paste this into Terminal to recreate it.
**If you're deploying straight from the branch (method A), you don't need it at all.**

```bash
cd ~/Documents/Nabla/nabla2ai.github.io
mkdir -p .github/workflows
cat > .github/workflows/pages.yml <<'YAML'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Check out the repository
        uses: actions/checkout@v4
      - name: Configure Pages
        uses: actions/configure-pages@v5
      - name: Upload the site
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
YAML
```

---

## 3. Commit and push

```bash
cd ~/Documents/Nabla/nabla2ai.github.io

git init -b main
git add -A
git commit -m "Initial commit: Nabla Square website and brand assets"
```

Then create the remote and push — **either** with the GitHub CLI:

```bash
gh auth login          # only needed once
gh repo create nabla2ai/nabla2ai.github.io --public --source=. --remote=origin --push
```

**or** without it — create the empty repo at <https://github.com/new>
(owner `nabla2ai`, name `nabla2ai.github.io`, public, **no** README/licence/gitignore), then:

```bash
git remote add origin https://github.com/nabla2ai/nabla2ai.github.io.git
git push -u origin main
```

---

## 4. Switch Pages on

Repository → **Settings** → **Pages**, then pick one:

- **A. Deploy from a branch** *(simplest)* — Source: *Deploy from a branch*, branch `main`, folder `/ (root)`
- **B. GitHub Actions** — Source: *GitHub Actions*; the workflow from step 2 takes over from there

First build takes a minute or two. The site then lives at:

> **https://nabla2ai.github.io**

---

## 5. Before you tell anyone about it

Replace the placeholders — the full list is in [README.md](README.md), but the
one that matters most:

```bash
cd ~/Documents/Nabla/nabla2ai.github.io
grep -rn "hello@nablasquare.co.uk" . --exclude-dir=.git
```

That address appears in `index.html` (contact block, footer, JSON-LD schema) and
in `assets/js/main.js` (the `INBOX` constant the form uses). Swap in the real one,
then commit and push again:

```bash
git add -A && git commit -m "Set real contact address" && git push
```

---

## Later: making changes

```bash
cd ~/Documents/Nabla/nabla2ai.github.io
# edit index.html / assets/css/styles.css
python3 -m http.server 8000     # preview at http://localhost:8000
git add -A && git commit -m "Describe the change" && git push
```

Pages redeploys within a minute of the push.
