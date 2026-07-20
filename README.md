# Huaxi Precision Breeding Platform

Landing page for the Huaxi Precision Breeding Platform — a genomic selection
and breeding decision pipeline covering chip data imputation, quality
control, genomic prediction, model selection, and mate allocation.

Static site, no build step. Files: `index.html`, `styles.css`.

## Push to GitHub

1. Create a new empty repo on GitHub (no README/license, so there's nothing to conflict) — e.g. `huaxi-breeding-platform`.

2. In this folder, run:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Replace `<your-username>` and `<repo-name>` with your actual GitHub username and the repo you created.

## Host it free with GitHub Pages

1. On GitHub, go to the repo's **Settings > Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/<repo-name>/`

## Editing later

- Edit copy directly in `index.html` (each module is a `<article class="feature-card">` block).
- Colors/spacing live in `styles.css` under `:root` at the top.
- Commit and push again (`git add . && git commit -m "update" && git push`) to redeploy — GitHub Pages picks up changes automatically.
