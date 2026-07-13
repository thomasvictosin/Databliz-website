# SEO & Performance Optimization Guide

## What Was Added

### 1. **JSON-LD Structured Data** (app/layout.tsx)
   - **Organization schema**: Identifies your company to search engines with name, logo, URL, and contact info.
   - **WebSite schema**: Enables rich search results and the "site:" search operator.
   - Benefits: Rich snippets in search results, better knowledge panel visibility.

### 2. **Preconnect Headers** (app/layout.tsx)
   - Links preconnect to Google Fonts CDN to reduce DNS lookup time.
   - Improves Core Web Vitals (Largest Contentful Paint).

### 3. **OptimizedImage Component** (components/OptimizedImage.tsx)
   - Wrapper around Next.js `Image` for automatic optimization.
   - Features: lazy loading, format conversion (WebP), quality tuning (85%).
   - **Usage**:
     ```tsx
     import OptimizedImage from '@/components/OptimizedImage';
     <OptimizedImage 
       src="/images/hero.png" 
       alt="Hero" 
       width={1200} 
       height={630} 
       priority={true}
     />
     ```

## Next Steps

### Immediate Actions
1. **Replace `<img>` tags** with `<OptimizedImage>` in components (especially hero images).
   - Priority: `WhyDatablizExists.tsx` and any above-the-fold images.
   
2. **Add Google Analytics** (GA4):
   ```bash
   npm install next-gtag
   ```
   Then add to `app/layout.tsx`:
   ```tsx
   import { GoogleTagManager } from 'next-gtag';
   <GoogleTagManager gtmId="GTM-XXXXX" />
   ```

3. **Verify in Google Search Console**:
   - Go to https://search.google.com/search-console
   - Verify `databliz.com`
   - Submit sitemap: `https://databliz.com/sitemap.xml`
   - Check coverage and index status

### Performance Audit
- Run Lighthouse: DevTools → Lighthouse → Generate report
- Monitor Core Web Vitals: Google PageSpeed Insights
- Target: 90+ on Performance, Accessibility, Best Practices, SEO

### Current SEO Status
- ✅ Metadata & OG tags
- ✅ Robots.txt & Sitemap
- ✅ JSON-LD Schema
- ✅ Font preconnect
- ⏳ Image optimization (start with OptimizedImage component)
- ⏳ Analytics setup
- ⏳ Search Console verification
