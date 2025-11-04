import Image from 'next/image';
import Link from 'next/link';
import { articlesList } from '@/lib/data/articles';

export default function ArticlesPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg">
          <Image
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1920&q=80&auto=format&fit=crop"
            alt="Articles"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Articles</span>
          </div>
          <h1 className="page-title">Articles</h1>
          <p className="page-subtitle">Insights On Stone Carving & Craftsmanship</p>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {articlesList.map((article, index) => (
              <article
                key={article.id}
                className="article-card"
                data-aos="fade-up"
                data-aos-delay={article.delay}
              >
                <div className="article-image">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={500}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">{article.date}</span>
                    <span className="article-category">{article.category}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <Link href={`/articles/${article.slug}`} className="article-link">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
