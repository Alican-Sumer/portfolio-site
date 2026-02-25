# Deploy this site to Netlify (drag and drop)

1. **Build the site** (in this folder):
   ```bash
   npm run build
   ```

2. **Deploy on Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) and sign in.
   - Drag and drop the **`dist`** folder onto the Netlify deploy area (or use “Deploy manually” and choose the `dist` folder).
   - Netlify will serve the contents of `dist` as your site.

3. **Done.** Your portfolio will be live at the URL Netlify gives you.

**Note:** If you connect this repo to Netlify via Git instead, Netlify will use `netlify.toml` and run `npm run build` and publish `dist` automatically on each push.
