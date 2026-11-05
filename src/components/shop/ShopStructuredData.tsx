import React from 'react';
import { ShopProduct } from '../../data/shopData';

interface OrganizationSchemaProps {
  type: 'organization';
}

interface ProductSchemaProps {
  type: 'product';
  product: ShopProduct;
  url: string;
}

interface BreadcrumbSchemaProps {
  type: 'breadcrumb';
  items: { name: string; url: string }[];
}

interface FaqSchemaProps {
  type: 'faq';
  faqs: { question: string; answer: string }[];
}

type StructuredDataProps = OrganizationSchemaProps | ProductSchemaProps | BreadcrumbSchemaProps | FaqSchemaProps;

export const ShopStructuredData: React.FC<StructuredDataProps> = (props) => {
  let schemaData: any = null;

  if (props.type === 'organization') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mannazentrum Shop",
      "legalName": "PT. Elrafa Terang Sejahtera",
      "url": "https://shop.mannazentrum.com",
      "logo": "https://shop.mannazentrum.com/images/logo-toko-manna-maliaki.jpg",
      "description": "Penyedia kebutuhan harian keluarga terpadu di Indonesia dan Asia Tenggara: pakaian katun organik, sembako sehat beras & madu mentah, benih tanaman pekarangan rumah, dan perlengkapan ramah lingkungan.",
      "telephone": "+6287881110807",
      "email": "shop@mannazentrum.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kawasan Cisauk / Serpong Garden",
        "addressLocality": "Tangerang",
        "addressRegion": "Banten",
        "postalCode": "15345",
        "addressCountry": "ID"
      },
      "areaServed": ["ID", "SG", "MY", "BN", "TH", "PH"],
      "sameAs": [
        "https://www.mannazentrum.com"
      ]
    };
  } else if (props.type === 'product') {
    const { product, url } = props;
    schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": [product.image],
      "description": product.shortDescId,
      "sku": product.id,
      "mpn": product.slug,
      "brand": {
        "@type": "Brand",
        "name": "Mannazentrum"
      },
      "offers": {
        "@type": "Offer",
        "url": url,
        "priceCurrency": "IDR",
        "price": product.priceIdr,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Mannazentrum Shop"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toString(),
        "reviewCount": product.reviewCount.toString()
      }
    };
  } else if (props.type === 'breadcrumb') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": props.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  } else if (props.type === 'faq') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
