import { useEffect, useState } from 'react';

const SITE_URL = 'https://technodronerobotics.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/company-logo.jpeg`;

function setTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.name = name; document.head.appendChild(tag); }
  tag.content = content;
}

function setProperty(name, content) {
  let tag = document.querySelector(`meta[property="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', name); document.head.appendChild(tag); }
  tag.content = content;
}

function setLink(rel, href) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) { tag = document.createElement('link'); tag.rel = rel; document.head.appendChild(tag); }
  tag.href = href;
}

function setScript(type, content) {
  let tag = document.querySelector(`script[type="${type}"]`);
  if (!tag) { tag = document.createElement('script'); tag.type = type; document.head.appendChild(tag); }
  tag.textContent = content;
}

export default function SEOHead({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const fullTitle = title || 'Techno Drone Robotics | Cutting-Edge Drone Technology';
    const fullDescription = description || 'Techno Drone Robotics - Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications.';

    document.title = fullTitle;
    setTag('description', fullDescription);
    setTag('viewport', 'width=device-width, initial-scale=1');
    setTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setTag('theme-color', '#0B1E3D');
    setTag('application-name', 'Techno Drone Robotics');
    setLink('canonical', url);

    setProperty('og:title', fullTitle);
    setProperty('og:description', fullDescription);
    setProperty('og:image', image);
    setProperty('og:url', url);
    setProperty('og:type', type);
    setProperty('og:site_name', 'Techno Drone Robotics');
    setProperty('og:locale', 'en_US');

    setTag('twitter:card', 'summary_large_image');
    setTag('twitter:title', fullTitle);
    setTag('twitter:description', fullDescription);
    setTag('twitter:image', image);
    setTag('twitter:site', '@technodrone');

    const ld = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Techno Drone Robotics',
        url: SITE_URL,
        logo: `${SITE_URL}/company-logo.jpeg`,
        description: 'Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications.',
        foundingDate: '2020',
        contactPoint: { '@type': 'ContactPoint', telephone: '+91-8989846072', contactType: 'sales', email: 'technodroneroboticspvt.ltd@gmail.com' },
        sameAs: ['https://linkedin.com/company/technodrone', 'https://twitter.com/technodrone', 'https://youtube.com/@technodrone'],
        address: { '@type': 'PostalAddress', streetAddress: 'Ayodhaya Nagar', addressLocality: 'Bhopal', addressRegion: 'MP', postalCode: '462041', addressCountry: 'IN' },
      },
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Techno Drone Robotics', description: fullDescription, publisher: { '@id': `${SITE_URL}/#organization` } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${url}/#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, ...(path !== '/' ? [{ '@type': 'ListItem', position: 2, name: fullTitle.split('|')[0]?.trim() || 'Page', item: url }] : [])] },
      ...jsonLd,
    ];
    setScript('application/ld+json', JSON.stringify(ld));
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}
