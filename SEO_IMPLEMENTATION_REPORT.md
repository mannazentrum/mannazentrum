# SEO & GEO IMPLEMENTATION REPORT
## Manna Shop Eco-Family (`https://shop.mannazentrum.com/`)

**Author:** Senior E-Commerce Architect & Technical SEO Specialist  
**Target Domain:** `https://shop.mannazentrum.com/`  
**Parent Organization:** PT. Elrafa Terang Sejahtera / Mannazentrum  

---

### 1. Architectural SEO & URL Structure
The shop structure strictly adheres to clean, hierarchical e-commerce URLs without unnecessary nesting or hash fragments:

```
shop.mannazentrum.com/
│
├── category/
│   ├── pakaian/
│   ├── makanan/
│   ├── tanaman/
│   ├── harian/
│   └── paket/
│
├── product/
│   ├── set-piyama-katun-organik-anak/
│   ├── beras-organik-pandan-wangi/
│   ├── madu-hutan-murni-sumbawa/
│   └── [16 unique SEO slugs]/
│
├── about-us/
├── contact/
├── shipping-policy/
├── return-policy/
└── blog/
    ├── merawat-kebun-organik-di-lahan-sempit/
    ├── panduan-memilih-pakaian-organik-untuk-anak/
    └── manfaat-madu-hutan-murni-untuk-daya-tahan-tubuh/
```

- **Canonical URLs:** All pages define an explicit `<link rel="canonical" href="...">` ensuring search engines do not duplicate content between staging aliases and production.
- **Title Tag Formulation:** `[Product / Page Name] | Manna Shop Eco-Family - Kebutuhan Harian & Herbal Keluarga ASEAN`
- **Heading Hierarchy:** One distinct `<h1>` per page, logical `<h2>` for sections and `<h3>` for individual cards.
- **Image Optimization:** All product images carry meaningful, localized `alt` tags and `loading="lazy"` attributes.

---

### 2. Schema.org (JSON-LD) Structured Data Implementation
Implemented dynamically in `src/components/shop/ShopStructuredData.tsx` and injected cleanly:

#### A. `Organization` Schema (Sitewide / Storefront)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Manna Shop Eco-Family",
  "url": "https://shop.mannazentrum.com",
  "logo": "https://mannazentrum.com/images/logo.png",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Mannazentrum - PT. Elrafa Terang Sejahtera"
  },
  "areaServed": ["ID", "SG", "MY", "BN", "TH", "PH"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+6281234567890",
    "contactType": "customer service",
    "availableLanguage": ["Indonesian", "English", "Malay"]
  }
}
```

#### B. `Product` & `Offer` Schema (Product Detail Pages)
- Validated with Google Rich Results test specifications:
  - `name`, `image`, `description`, `sku`, `brand`.
  - `offers`: `price`, `priceCurrency` (IDR/SGD/MYR/USD), `availability` (`InStock` or `OutOfStock`), `seller`.
  - `aggregateRating`: Real rating stars and review count.

#### C. `BreadcrumbList` Schema
- Generates step-by-step breadcrumbs for Google SERP navigation:
  - `Home` > `Kategori` > `[Category Name]` > `[Product Name]`

#### D. `FAQPage` Schema
- Automatically parsed from product specifications and care instructions to qualify for expandable rich snippets on Google Search.

---

### 3. Generative Engine Optimization (GEO) & AI Search Readiness
Modern AI search engines (Google Gemini Search, ChatGPT Search / SearchGPT, Perplexity AI, Claude) require clear contextual facts rather than keyword stuffing. We implemented:
1. **Robots.txt Whitelisting:** Permitting `Google-Extended`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Applebot-Extended`.
2. **Transparent Business Facts:** Clear physical warehouse location, certifications (Organik Indonesia, Halal MUI, Karantina Tumbuhan), transparent shipping policy, and refund rules.
3. **Structured Entity Interlinking:** Connecting educational guides on `/blog/*` with the corresponding certified seeds and organic apparel.

---

### 4. Technical Crawl Assets
- **`public/sitemap.xml`:** Contains comprehensive URLs for both main domain and shop domain, updated with `<changefreq>` and `<priority>`.
- **`public/robots.txt`:** Fully configured to disallow administrative routes (`/admin/`, `/dashboard/`, `/cms/`) while allowing indexable shop assets.
