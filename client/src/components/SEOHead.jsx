import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://technodronerobotics.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/company-logo.jpeg`;

export default function SEOHead({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title || 'Techno Drone Robotics | Cutting-Edge Drone Technology';
  const fullDescription = description || 'Techno Drone Robotics - Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Techno Drone Robotics" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@technodrone" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#0B1E3D" />
      <meta name="application-name" content="Techno Drone Robotics" />

      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            "name": "Techno Drone Robotics",
            "url": SITE_URL,
            "logo": `${SITE_URL}/company-logo.jpeg`,
            "description": "Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications.",
            "foundingDate": "2020",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8989846072",
              "contactType": "sales",
              "email": "technodroneroboticspvt.ltd@gmail.com"
            },
            "sameAs": [
              "https://linkedin.com/company/technodrone",
              "https://twitter.com/technodrone",
              "https://youtube.com/@technodrone"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Innovation Drive",
              "addressLocality": "Tech Valley",
              "addressRegion": "CA",
              "postalCode": "94025",
              "addressCountry": "US"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            "url": SITE_URL,
            "name": "Techno Drone Robotics",
            "description": fullDescription,
            "publisher": { "@id": `${SITE_URL}/#organization` }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${url}/#breadcrumb`,
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
              ...(path !== '/'
                ? [{ "@type": "ListItem", "position": 2, "name": fullTitle.split('|')[0]?.trim() || 'Page', "item": url }]
                : [])
            ]
          },
          ...jsonLd,
        ])}
      </script>
    </Helmet>
  );
}
