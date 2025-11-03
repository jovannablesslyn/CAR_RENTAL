# CAR-RENTAL-APP — Frontend deployment

This repository contains a `frontend/` folder with a static site (e.g. `index.html`). I added a GitHub Actions workflow to automatically publish the contents of `frontend/` to the `gh-pages` branch so GitHub Pages can serve it.

What I added

- `.github/workflows/gh-pages.yml` — deploys `frontend/` to the `gh-pages` branch on pushes to `main` or on manual dispatch.

How to activate (PowerShell)

1. Commit the new files (if not already committed) and push to GitHub:

```powershell
git add .github/workflows/gh-pages.yml README.md
git commit -m "Add GH Pages workflow to deploy frontend"
git push origin main
```

2. Go to your GitHub repository page -> Actions -> open the "Deploy Frontend to GitHub Pages" workflow to watch the run.

3. When the workflow completes successfully, it will push the built files into the `gh-pages` branch. Visit Settings -> Pages in your repository to confirm the site URL (GitHub usually picks the `gh-pages` branch automatically). The published URL will be like:

```
https://<your-github-username>.github.io/<repo-name>/
```

Notes and troubleshooting

- If your site uses client-side routing and 404s appear on refresh, consider adding a `404.html` that redirects to `index.html`, or use a different hosting setup.
- If your org or repo restricts Actions permissions, ensure Actions can push to `gh-pages` or grant the workflow a suitable token.
- If you prefer to serve from the `docs/` folder on `main` instead of `gh-pages`, let me know and I can change the workflow.

Next steps I can do for you

- Modify the workflow to run a build step (npm/yarn) if `frontend/` is a framework project (React/Vue/etc.).
- Configure a custom domain and create a `CNAME` file.

Render deployment & environment variables
---------------------------------------

If you want to deploy the `frontend/` folder as a Static Site on Render, I've added an example `render.yaml` and a small build helper that writes environment variables into `frontend/env.js` during the build. This is useful for plain static sites without a bundler.

Files added for Render:

- `render.yaml` — example service definition that points to `frontend/` and runs a build command `node render/write-env.js`.
- `render/write-env.js` — Node script that creates `frontend/env.js` containing `window.__ENV = { API_URL: "..." }` using the `API_URL` value from Render environment variables.

How to use the runtime env in your frontend (plain static HTML/JS)

1. In Render dashboard, set the environment variable `API_URL` for the static site to your backend URL (for production). Example value:

	 https://car-rental-backend.onrender.com

2. On each build Render will run `node render/write-env.js` which writes `frontend/env.js`.

3. Include `env.js` in your `frontend/index.html` (before your app script) so client code can read `window.__ENV.API_URL`:

```html
<script src="/env.js"></script>
<script src="/app.js"></script>
```

4. Use it in your app code:

```javascript
const apiUrl = window.__ENV && window.__ENV.API_URL;
fetch(`${apiUrl}/some-endpoint`)
	.then(r => r.json())
	.then(...)
```

Security note: anything exposed to client-side code is public. Do not place DB connection strings or private keys in frontend env vars.

If you'd like, I can commit these files to your repo (done) and push them for you, or I can change the `render.yaml` to use a different env key/pattern. If you want automatic runtime config without a build step, we can implement an AJAX-read `env.json` pattern and serve it directly (requires different setup).

