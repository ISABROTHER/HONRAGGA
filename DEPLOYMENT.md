# Deployment Instructions

## Environment Variables Required

This application requires the following environment variables to be set in your hosting platform:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Hosting Platform Setup

### For Netlify:
1. Go to Site Settings > Build & Deploy > Environment
2. Add the two environment variables above
3. The site will automatically rebuild with the correct configuration

### For Vercel:
1. Go to Project Settings > Environment Variables
2. Add the two environment variables above
3. Redeploy the site

### For Other Platforms:
Make sure your hosting platform:
- Supports Single Page Applications (SPA)
- Has the environment variables configured
- Uses the `_redirects` file for proper routing
- Serves the built files from the `dist` folder

## Build Command
```bash
npm run build
```

## Output Directory
```
dist
```

## Google Search Console Fix

If you're seeing "Server error (5xx)" in Google Search Console:

1. Ensure environment variables are set in your hosting platform
2. Redeploy the site after setting the variables
3. Test the live URL in Google Search Console
4. Request a new indexing after the fix

The site should load without JavaScript errors and be fully crawlable by Google.
