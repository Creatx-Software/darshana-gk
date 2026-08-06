import Link from 'next/link';

/**
 * 404 page. Next serves this with a real 404 status and injects its own
 * `noindex`, so a mistyped URL never enters the index. Next ignores a
 * `metadata` export from the root not-found, which is why the root layout
 * deliberately sets no robots directive of its own — see `buildRootMetadata`.
 *
 * The links out are deliberate: a dead end wastes the crawl, whereas routing
 * visitors and crawlers back into the portfolio keeps the link graph intact.
 */
export default function NotFound() {
  return (
    <main>
      <section className="page-header" style={{ minHeight: '70vh' }}>
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Page Not Found</span>
          </div>

          <h1 className="page-title">404</h1>
          <p className="page-subtitle">
            This page has weathered away. The stone, thankfully, has not.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
            }}
          >
            <Link href="/" className="btn btn-carved">
              Back to Home
            </Link>
            <Link href="/#portfolio" className="btn btn-stone">
              View Portfolio
            </Link>
            <Link href="/contact" className="btn btn-stone">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
