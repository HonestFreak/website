import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from 'Hooks/useSiteMetadata';
import defaultOpenGraphImage from 'Images/og-default.png';

const SEO = ({ description = '', meta = [], image = null, title }) => {
  const site = useSiteMetadata();
  const metaDescription = description || site.siteMetadata.description;
  const ogImageUrl =
    site.siteMetadata.siteUrl + (image || defaultOpenGraphImage);

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'google-site-verification',
          content: 'sb8JV2H8vhofu-BCxVrlbKsADhBmnfSHCiseZOzulug'
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          property: 'image',
          content: ogImageUrl,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          property: 'twitter:image',
          content: ogImageUrl,
        },
      ].concat(meta)}
    >
      <script src="https://kit.fontawesome.com/35817f7795.js" crossorigin="anonymous"></script>
    </Helmet>
  );
};

export default SEO;
