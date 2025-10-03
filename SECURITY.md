# Security Implementation

## Overview

This document outlines the security measures implemented for the CU-AA website.

## Authentication System

### Netlify Identity
The site uses **Netlify Identity** for authentication, providing:
- Secure JWT-based authentication
- Built-in email/password authentication
- Optional OAuth providers (Google, GitHub, etc.)
- Role-based access control
- Password recovery flows

### Setup Instructions

1. **Enable Netlify Identity** in your Netlify site dashboard:
   - Go to Site Settings > Identity
   - Click "Enable Identity"
   - Configure registration preferences (Invite only or Open)

2. **Configure Identity Settings**:
   - **Registration**: Set to "Invite only" for controlled access
   - **External Providers**: Optional - enable Google/GitHub OAuth
   - **Email Templates**: Customize confirmation and recovery emails
   - **Git Gateway**: Enable if using Netlify CMS

3. **Environment Variables** (Set in Netlify Dashboard):
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@cu-aa.org
   ```

## Protected Pages

### Member Area Protection
All pages under `/members/*` are protected using:

1. **Client-side Auth Check** (`_layouts/member.html`):
   - Verifies Netlify Identity authentication
   - Redirects unauthenticated users to home page
   - Shows loading state during verification

2. **Server-side Role Check** (`netlify.toml`):
   - Netlify Edge Functions enforce role-based access
   - Only users with "member" or "admin" roles can access

### Usage
To protect a page, use the `member` layout:
```yaml
---
layout: member
title: "Protected Page"
---
```

## CSRF Protection

### Implementation
CSRF tokens are generated via serverless function and validated on submissions:

1. **Token Generation** (`netlify/functions/csrf-token.js`):
   - Authenticated users request tokens
   - Tokens expire after 1 hour
   - One-time use tokens

2. **Form Protection** (`_includes/csrf-protection.html`):
   - Automatically adds tokens to forms with `data-csrf="true"`
   - Provides `fetchWithCSRF()` helper for AJAX requests

### Usage
For protected forms:
```html
<form data-csrf="true" action="/.netlify/functions/your-handler">
  <!-- Form fields -->
</form>
```

For fetch requests:
```javascript
const response = await fetchWithCSRF('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## Environment Variables

### Local Development
1. Copy `.env.example` to `.env`
2. Fill in your credentials:
   - `EMAIL_USER`: Gmail address for sending emails
   - `EMAIL_PASS`: Gmail app password (not regular password)
   - `ADMIN_EMAIL`: Admin email for notifications

**Important**: `.env` is gitignored and should NEVER be committed

### Production (Netlify)
Set environment variables in Netlify Dashboard:
- Site Settings > Environment variables
- Add the same variables as in `.env.example`

## Security Headers

### Content Security Policy (CSP)
Configured in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## Best Practices

### For Developers
1. **Never commit credentials** - Use environment variables
2. **Always use CSRF protection** for state-changing operations
3. **Verify authentication** server-side for sensitive operations
4. **Rotate secrets** regularly (email passwords, API keys)
5. **Use HTTPS** in production (Netlify provides this automatically)

### For Administrators
1. **Set registration to "Invite only"** until launch
2. **Review user roles** regularly in Netlify Identity dashboard
3. **Monitor failed login attempts** in Netlify Analytics
4. **Keep email templates** professional and branded
5. **Enable 2FA** on your Netlify account

## Incident Response

If credentials are exposed:
1. **Immediately rotate** the exposed credentials
2. **Update environment variables** in Netlify
3. **Check git history** for commits containing secrets
4. **Revoke OAuth tokens** if applicable
5. **Notify affected users** if user data was exposed

## Security Checklist

Before going live:
- [ ] Netlify Identity enabled and configured
- [ ] Registration set to "Invite only"
- [ ] Environment variables configured in Netlify
- [ ] `.env` file is gitignored and not in git history
- [ ] CSRF protection tested on all forms
- [ ] Member pages redirect unauthenticated users
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Security headers configured
- [ ] Email templates customized
- [ ] Admin accounts have strong passwords
- [ ] 2FA enabled on Netlify account

## Additional Resources

- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [OWASP Security Guidelines](https://owasp.org/www-project-web-security-testing-guide/)
- [Content Security Policy Guide](https://content-security-policy.com/)
