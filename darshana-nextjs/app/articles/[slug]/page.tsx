import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesData, articlesList } from '@/lib/data/articles';
import JsonLd from '@/components/seo/JsonLd';
import { ARTICLES_ENABLED } from '@/lib/seo/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { toPlainText, truncate } from '@/lib/seo/utils';
import { articleSchema, breadcrumbSchema, jsonLdGraph } from '@/lib/seo/jsonld';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every article so each one ships its own crawlable HTML. */
export function generateStaticParams() {
  return articlesList.map((article) => ({ slug: article.slug }));
}

/** The article `date` is authored as display text ("January 15, 2024"). */
function toIsoDate(date: string): string | undefined {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

/** First paragraph of the lead text, used when no excerpt was written. */
function articleDescription(slug: string): string {
  const article = articlesData[slug];
  const listEntry = articlesList.find((entry) => entry.slug === slug);
  return truncate(listEntry?.excerpt || toPlainText(article?.content?.leadText, 300), 300);
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    return buildMetadata({ title: 'Article not found', path: `/articles/${slug}`, noindex: true });
  }

  return buildMetadata({
    title: article.title,
    description: articleDescription(slug),
    path: `/articles/${slug}`,
    ogType: 'article',
    ogEyebrow: article.category,
    images: [{ url: article.featuredImage, alt: article.title }],
    // Kept out of the index until the articles section is launched.
    noindex: !ARTICLES_ENABLED,
    article: {
      publishedTime: toIsoDate(article.date),
      section: article.category,
    },
  });
}

export default async function ArticleSinglePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  const schema = jsonLdGraph(
    articleSchema({
      title: article.title,
      description: articleDescription(slug),
      path: `/articles/${slug}`,
      image: article.featuredImage,
      datePublished: toIsoDate(article.date),
      section: article.category,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/articles' },
      { name: article.title },
    ])
  );

  return (
    <main>
      <JsonLd data={schema} />
      {/* Article Header */}
      <section className="article-header">
        <div className="article-header-bg">
          <Image
            src={article.headerImage}
            alt={article.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="article-header-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/articles">Articles</Link>
            <span>/</span>
            <span>{article.title}</span>
          </div>
          <div className="article-header-meta">
            <span className="article-category">{article.category}</span>
            <span className="article-date">{article.date}</span>
          </div>
          <h1 className="article-header-title">{article.title}</h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="article-single">
        <div className="container-article">
          {/* Featured Image */}
          <div className="article-featured-image">
            <img src={article.featuredImage} alt={article.title} />
          </div>

          {/* Article Body */}
          <div className="article-body">
            <p className="lead-text">{article.content.leadText}</p>

            {article.content.sections.map((section, index) => (
              <div key={index}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Article Footer */}
          <div className="article-footer">
            <div className="article-share">
              <p>Share this article:</p>
              <div className="share-buttons">
                <a href="#" className="share-btn" aria-label="Share on Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            <Link href="/articles" className="btn btn-carved">
              ← Back to Articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
