# Deployment Guide - Netlify

This guide covers deploying the CU-AA application to Netlify.

## Prerequisites

1. A [Netlify](https://netlify.com) account
2. A [Clerk](https://clerk.com) application set up
3. A [Supabase](https://supabase.com) project created
4. The Supabase schema deployed (from `supabase_setup.sql`)

## Step 1: Connect Repository to Netlify

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, etc.)
4. Select the `cu-aa-site` repository
5. Netlify should auto-detect the Next.js framework

## Step 2: Configure Build Settings

Netlify should automatically configure these, but verify:

- **Build command:** `npm run build`
- **Publish directory:** (leave empty - handled by plugin)
- **Functions directory:** `.netlify/functions`

## Step 3: Set Environment Variables

In Netlify dashboard, go to **Site settings** → **Environment variables** and add:

### Required Variables

#### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Where to find:**
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Select your application
- Navigate to **API Keys**
- Copy the Publishable Key and Secret Key

#### Supabase Database
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Where to find:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Navigate to **Settings** → **API**
- Copy the Project URL and anon/public key

### Optional Variables (if using email features)

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@cu-aa.org
```

## Step 4: Configure Clerk for Production

1. In your Clerk Dashboard, go to **Domains**
2. Add your Netlify domain (e.g., `your-site.netlify.app`)
3. If using a custom domain, add that as well
4. Update the **Redirect URLs** to include:
   - `https://your-site.netlify.app/sign-in`
   - `https://your-site.netlify.app/sign-up`
   - `https://your-site.netlify.app/`

## Step 5: Configure Supabase RLS Policies

Ensure your Supabase Row Level Security (RLS) policies are properly configured:

1. Go to Supabase Dashboard → **Authentication** → **Policies**
2. Verify policies exist for the `profiles` table
3. Users should be able to:
   - Read all profiles (for directory)
   - Update only their own profile

See `supabase_setup.sql` for the reference schema.

## Step 6: Deploy

1. Click **Deploy site** in Netlify
2. Monitor the deploy logs for any errors
3. Once deployed, visit your site URL

## Troubleshooting

### Build Fails

**Check:**
- All environment variables are set correctly
- No syntax errors in code
- Dependencies are properly installed

**Common issues:**
- Missing environment variables
- Clerk keys from wrong environment (test vs production)
- Supabase URL or key incorrect

### Authentication Not Working

**Check:**
- Clerk domain is added in dashboard
- Environment variables match your Clerk application
- Redirect URLs are configured in Clerk

### Database Connection Issues

**Check:**
- Supabase URL and anon key are correct
- RLS policies are enabled
- Network requests aren't being blocked

## Custom Domain Setup (Optional)

1. In Netlify, go to **Domain settings**
2. Click **Add custom domain**
3. Follow DNS configuration instructions
4. Update Clerk domains to include your custom domain
5. SSL certificate will be automatically provisioned

## Production Checklist

- [ ] All environment variables set in Netlify
- [ ] Clerk production keys configured
- [ ] Clerk domains updated with production URL
- [ ] Supabase RLS policies enabled
- [ ] Test authentication flow (sign up, sign in, sign out)
- [ ] Test profile creation and editing
- [ ] Test members directory
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test protected routes

## Monitoring

### Netlify Analytics
- View deploy history and build logs in Netlify dashboard
- Monitor site performance and traffic

### Error Tracking
Consider adding error tracking (Sentry, LogRocket, etc.) for production monitoring.

## Updating the Site

Any push to your main branch will trigger a new deployment automatically.

To deploy manually:
1. Go to Netlify dashboard
2. Click **Deploys**
3. Click **Trigger deploy** → **Deploy site**

## Support

For issues:
- Check Netlify deploy logs
- Review Clerk dashboard for auth issues
- Check Supabase logs for database issues
- Refer to `CLAUDE.md` for development guidance
