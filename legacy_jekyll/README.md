# Columbia University Africa Alumni

A community platform for Columbia University graduates focused on African development discussions, mentorship programs, and networking.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## Overview

The CU-AA website is a Jekyll-based static site that brings together 90+ Columbia alumni working on African development issues. It features:

- **Discussion Streams**: Topic-specific discussion hubs for economics, technology, education, and more
- **Blog Platform**: Community-driven content on African development challenges and solutions
- **Member Directory**: Searchable alumni directory with advanced filtering by location, industry, and expertise
- **Discord Integration**: Real-time community chat channels integrated directly into discussion streams
- **Mentorship Programs**: Connect experienced alumni with emerging leaders

## Technology Stack

- **Framework**: Jekyll 4.4.1 (Ruby static site generator)
- **Hosting**: Netlify (automatic deployments from `main` branch)
- **Authentication**: Netlify Identity (JWT-based, role-based access control)
- **Comments**: Giscus (GitHub Discussions-backed commenting system) - **Note:** Site uses Giscus, not Disqus
- **Chat**: Discord widget integration
- **Functions**: Netlify serverless functions for blog submission and alumni directory
- **Styling**: Custom CSS with Columbia University branding

## Quick Start

### Prerequisites

- Ruby 3.2.0 or higher
- Bundler gem (`gem install bundler`)
- Node.js and npm (for Netlify Functions)

### Installation

```bash
# Clone the repository
git clone https://github.com/ESGmichaelNY/cu-aa-site.git
cd cu-aa-site

# Install Ruby dependencies
bundle install

# Install Node dependencies (for serverless functions)
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your credentials
```

### Development

```bash
# Start Jekyll development server
bundle exec jekyll serve

# Site will be available at http://localhost:4000
# Changes are auto-reloaded (except _config.yml changes)
```

### Building for Production

```bash
bundle exec jekyll build
# Output in _site/ directory
```

## Project Structure

```
cu-aa-site/
├── _config.yml           # Site configuration and navigation
├── _includes/            # Reusable components
│   ├── header.html       # Navigation with Netlify Identity
│   ├── footer.html       # Footer with newsletter signup
│   ├── giscus.html       # GitHub Discussions integration
│   ├── csrf-protection.html  # CSRF token helpers
│   └── auth-check.html   # Authentication utilities
├── _layouts/             # Page templates
│   ├── default.html      # Base layout with SEO
│   ├── member.html       # Protected member area layout
│   ├── post.html         # Blog post layout
│   └── page.html         # Generic page layout
├── _posts/               # Blog posts (markdown)
├── _programs/            # Program pages collection
├── members/              # Protected member area
│   ├── dashboard/        # Member dashboard
│   ├── directory/        # Alumni directory with filters
│   ├── opportunities/    # Job board and opportunities
│   └── profile/          # User profile management
├── streams/              # Discussion stream pages
├── netlify/functions/    # Serverless backend
│   ├── alumni-directory.js    # Directory data endpoint
│   ├── csrf-token.js          # CSRF token generation
│   ├── submit-blog-post.js    # Blog submission handler
│   ├── user-stats.js          # Member statistics
│   └── verify-auth.js         # Auth verification
├── assets/css/           # Stylesheets
├── admin/                # Admin dashboard for post creation
└── netlify.toml          # Netlify configuration
```

## Key Features

### 1. Authentication & Security

- **Netlify Identity**: JWT-based authentication with role-based access
- **Protected Routes**: `/members/*` pages require authentication
- **CSRF Protection**: Token-based protection for forms and API calls
- See [SECURITY.md](SECURITY.md) for full security documentation

### 2. Discussion Streams

Topic-specific hubs that aggregate blog posts and link to Discord channels:
- Economics & Trade
- Technology & Innovation
- Education
- Healthcare
- Policy & Governance
- Climate & Environment

### 3. Member Directory

Fully functional alumni directory with:
- Real member data (90+ alumni)
- Advanced filtering (location, industry, class year, expertise)
- Dynamic search with real-time updates
- Modal detail views with social links
- Responsive grid layout

### 4. Blog Platform

- Community-driven content submission
- Admin moderation dashboard at `/admin/`
- Giscus-powered comments (GitHub Discussions)
- Category-based organization
- SEO-optimized permalinks

### 5. Discord Integration

- Server ID: `1393296489295384726`
- Embedded widgets on stream pages
- Topic-specific channels
- Invite link: https://discord.gg/buzRNDjggr

## Content Management

### Adding a Blog Post

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title-slug.markdown`
2. Add frontmatter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-10-03
author: "Your Name (CC '15)"
categories: economics  # or technology, education, healthcare, policy, climate
---

Your content here...
```

3. Commit and push to trigger rebuild

Alternatively, use the admin dashboard at `/admin/` to generate properly formatted posts.

### Adding a Program Page

Create a file in `_programs/` (e.g., `_programs/new-program.md`):

```yaml
---
layout: program
title: "Program Name"
description: "Brief description"
---

Program content...
```

Auto-routes to `/programs/new-program/`

### Modifying Navigation

Edit the `navigation:` array in `_config.yml`:

```yaml
navigation:
  - title: Menu Item
    url: /page-url/
  - title: Dropdown Menu
    dropdown:
      - title: Submenu Item
        url: /submenu-url/
```

Restart Jekyll server after config changes.

## Deployment

### Automatic Deployment

Netlify automatically deploys when you push to `main`:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Netlify Configuration

- **Build command**: `bundle exec jekyll build`
- **Publish directory**: `_site`
- **Ruby version**: 3.2.0 (set in `netlify.toml`)

### Environment Variables

Set in Netlify Dashboard (Site Settings > Environment Variables):

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@cu-aa.org
```

See `.env.example` for local development setup.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Security

This project implements:
- Netlify Identity authentication
- CSRF protection for forms
- Role-based access control
- Secure credential handling

See [SECURITY.md](SECURITY.md) for detailed security documentation.

## Development Guidance

For AI-assisted development, see [CLAUDE.md](CLAUDE.md) for comprehensive project architecture and development patterns.

## License

Copyright © 2025 Columbia University Africa Alumni. All rights reserved.

## Contact

- **Email**: info@cu-aa.org
- **Discord**: https://discord.gg/buzRNDjggr
- **LinkedIn**: https://linkedin.com/company/cu-africa-alumni
- **Twitter**: @CU_AfricaAlumni

## GitHub Integration

### Current Setup

✅ **Connected to GitHub**: `cu-aa-admin/cu-aa-site`
- Remote: `https://github.com/cu-aa-admin/cu-aa-site`
- Giscus comments configured with repository discussions
- Auto-deployment via Netlify on push to `main`

### Comment System: Giscus (Not Disqus)

The site uses **Giscus**, not Disqus, for comments. Giscus is integrated with GitHub Discussions:

- **Repository**: `cu-aa-admin/cu-aa-site`
- **Repository ID**: `R_kgDOPLh8Gg`
- **Category**: "Website Discussions"
- **Category ID**: `DIC_kwDOPLh8Gs4Cs3qT`
- **Configuration**: `_includes/giscus.html`

**Why Giscus over Disqus?**
- Free and open-source
- No ads
- Backed by GitHub Discussions (better for developer communities)
- Supports reactions and threaded comments
- Privacy-friendly

## Links

- [Website](https://cu-aa.org)
- [GitHub Repository](https://github.com/cu-aa-admin/cu-aa-site)
- [GitHub Discussions](https://github.com/cu-aa-admin/cu-aa-site/discussions)
- [Report Issues](https://github.com/cu-aa-admin/cu-aa-site/issues)
