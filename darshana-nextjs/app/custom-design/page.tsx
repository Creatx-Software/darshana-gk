import type { Metadata } from 'next';
import { fetchCustomDesignItems, fetchCustomDesignPage } from '@/lib/api/strapi';
import CustomDesignClient from './CustomDesignClient';
import JsonLd from '@/components/seo/JsonLd';
import { buildStrapiMetadata } from '@/lib/seo/strapi';
import { strapiMediaUrl, toPlainText } from '@/lib/seo/utils';
import {
  breadcrumbSchema,
  imageGallerySchema,
  jsonLdGraph,
  serviceSchema,
  type GalleryImage,
} from '@/lib/seo/jsonld';

const CUSTOM_DESIGN_DESCRIPTION =
  'Commission a one-of-a-kind granite piece. Browse our custom stone design catalogue — Buddha statues, memorials, ornamental carving and architectural stonework shaped to your own drawings by four generations of Sri Lankan master craftsmen.';

export async function generateMetadata(): Promise<Metadata> {
  const [pageSettings, designItems] = await Promise.all([
    fetchCustomDesignPage(),
    fetchCustomDesignItems(),
  ]);

  return buildStrapiMetadata({
    seo: pageSettings?.seo,
    title: 'Custom Stone Design',
    description:
      toPlainText(pageSettings?.catalogDescription, 300) || CUSTOM_DESIGN_DESCRIPTION,
    path: '/custom-design',
    ogEyebrow: 'Made to order',
    fallbackImage: designItems[0]?.image,
    keywords: [
      'custom granite design Sri Lanka',
      'bespoke stone carving',
      'custom Buddha statue',
      'custom memorial stone',
      'stone design catalogue',
    ],
  });
}

export default async function CustomDesignPage() {
  const [designItems, pageSettings] = await Promise.all([
    fetchCustomDesignItems(),
    fetchCustomDesignPage(),
  ]);

  const galleryImages: GalleryImage[] = designItems.flatMap((item) => {
    const url = strapiMediaUrl(item.image);
    if (!url) return [];

    const description = toPlainText(item.description, 200);
    return [{ url, name: item.title, ...(description ? { description } : {}) }];
  });

  const schema = jsonLdGraph(
    serviceSchema({
      name: 'Custom stone and granite design',
      description: CUSTOM_DESIGN_DESCRIPTION,
      path: '/custom-design',
    }),
    galleryImages.length
      ? imageGallerySchema({
          name: 'Custom design catalogue',
          description:
            toPlainText(pageSettings?.catalogDescription, 300) || CUSTOM_DESIGN_DESCRIPTION,
          path: '/custom-design',
          images: galleryImages,
        })
      : null,
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Custom Design' }])
  );

  return (
    <>
      <JsonLd data={schema} />
      <CustomDesignClient designItems={designItems} pageSettings={pageSettings} />
    </>
  );
}
