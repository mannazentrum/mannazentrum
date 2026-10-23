import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath }) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // 3. Update canonical link & OG URL
    const isShop = typeof window !== 'undefined' && window.location.hostname.startsWith('shop.');
    const fullUrl = isShop 
      ? `https://shop.mannazentrum.com${window.location.pathname === '/' ? '' : window.location.pathname}`
      : `https://mannazentrum.com${canonicalPath || window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
  }, [title, description, canonicalPath]);

  return null;
};

export default SEO;
