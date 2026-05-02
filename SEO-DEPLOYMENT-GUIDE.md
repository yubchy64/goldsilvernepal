# SEO Implementation Deployment Guide

This document provides instructions for deploying the SEO improvements to your Nepal Gold & Silver Tracker website.

## Pre-Deployment Checklist

### 1. Update Placeholder URLs

Replace all placeholder URLs with your actual domain name:

**Files to update:**

- `public/robots.txt` - Replace `https://goldsilvernepal.vercel.app` with your actual domain
- `public/sitemap.xml` - Replace `https://goldsilvernepal.vercel.app` with your actual domain
- `index.html` - Replace `https://goldsilvernepal.vercel.app` in canonical tag and schema markup
- `index.html` - Update email in Organization schema: `yubraj.dev.np@gmail.com`
- `index.html` - Update logo URL in Organization schema: `https://goldsilvernepal.vercel.app/logo.png`

### 2. Add Your Logo

Replace the placeholder logo reference with your actual logo:

- Upload your logo to the `public/` folder
- Update the logo URL in `index.html` Organization schema

### 3. Update Contact Information

In `components/About.tsx`, update the contact details:

- Email address
- Physical address
- Phone number (if applicable)

## Deployment Steps

### 1. Build the Project

```bash
npm run build
```

### 2. Deploy to Vercel

```bash
vercel --prod
```

Or push to your Git repository and let Vercel auto-deploy.

## Post-Deployment Actions

### 1. Submit Sitemap to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Verify ownership
4. Navigate to Sitemaps
5. Submit: `https://goldsilvernepal.vercel.app/sitemap.xml`

### 2. Verify Robots.txt

Check that `https://goldsilvernepal.vercel.app/robots.txt` is accessible and correct.

### 3. Test Schema Markup

Use the [Rich Results Test](https://search.google.com/test/rich-results) to verify:

- Organization schema
- WebSite schema
- FinancialProduct schema
- FAQPage schema

### 4. Test Core Web Vitals

Use [PageSpeed Insights](https://pagespeed.web.dev/) to check:

- LCP (Largest Contentful Paint) should be < 2.5s
- INP (Interaction to Next Paint) should be < 200ms
- CLS (Cumulative Layout Shift) should be < 0.1

### 5. Verify Canonical Tags

Check that the canonical tag points to your actual domain.

## SEO Monitoring

### Google Search Console

Monitor:

- Indexing status
- Coverage report
- Core Web Vitals
- Search analytics
- Mobile usability

### Key Metrics to Track

- Organic traffic growth
- Rankings for "gold price Nepal" and related keywords
- Click-through rates
- Core Web Vitals scores

## Content Updates

### Regular Updates Needed

1. **Blog Articles**: Add 2-3 new articles per month about:
   - Gold investing tips
   - Market analysis
   - Historical price comparisons
   - Investment strategies

2. **FAQ Updates**: Add new questions as users ask them

3. **Historical Data**: Ensure historical trends are updated regularly

### Suggested Blog Topics

- "How to Buy Gold in Nepal: Complete Guide"
- "Gold vs Silver: Which is Better for Investment?"
- "Understanding Nepal's Bullion Market"
- "Best Time to Buy Gold in Nepal"
- "Gold Investment Strategies for Beginners"
- "How to Store Gold Safely in Nepal"

## Next Steps for SEO Growth

### Phase 2 Recommendations

1. **Add More Schema Types**:
   - BreadcrumbList schema for navigation
   - Article schema for blog posts
   - Review schema if you add user reviews

2. **Create Location Pages** (if applicable):
   - Gold prices in major cities
   - Local jeweler directories

3. **Build Backlinks**:
   - Submit to business directories
   - Guest posts on finance blogs
   - Partnerships with jewellers

4. **Social Media Integration**:
   - Add social sharing buttons
   - Create social media profiles
   - Share price updates regularly

5. **Email Newsletter**:
   - Collect email addresses
   - Send daily/weekly price updates
   - Share market insights

## Troubleshooting

### Common Issues

**Sitemap not indexing:**

- Ensure sitemap.xml is in the `public/` folder
- Check that robots.txt references the correct sitemap URL
- Verify sitemap is accessible at the URL

**Schema not showing in Rich Results Test:**

- Schema is injected via JavaScript - use Rich Results Test which renders JS
- Check for JSON syntax errors
- Verify schema.org types are correct

**Core Web Vitals issues:**

- Optimize images (use WebP format)
- Minimize JavaScript bundle size
- Implement lazy loading
- Use CDN for static assets

## Contact

For questions or issues with the SEO implementation, refer to the main SEO plan document at `.windsurf/plans/seo-optimization-plan-7f77d2.md`.
