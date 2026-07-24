import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ColoredHeader from '@/components/ColoredHeader';
import Footer from '@/components/Footer';
import { getWordPressFeaturedImage, getWordPressFeaturedImageAlt, getWordPressPosts, getWordPressTerms } from '@/lib/wordpress';

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

const PER_PAGE = 3;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest Databliz insights, automation strategy tips, and practical process improvement ideas from our WordPress-powered blog.',
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const { posts, totalPages, status } = await getWordPressPosts(currentPage, PER_PAGE);
  const hasWordPressConfig = status !== 'missing-config';
  const previousPageHref = currentPage > 1 ? `/blog?page=${currentPage - 1}` : null;
  const nextPageHref = typeof totalPages === 'number' && currentPage < totalPages ? `/blog?page=${currentPage + 1}` : null;

  const paginationItems = (() => {
    if (typeof totalPages !== 'number' || totalPages <= 7) {
      return Array.from({ length: totalPages || 0 }, (_, index) => ({ type: 'page' as const, page: index + 1 }));
    }

    if (currentPage <= 4) {
      return [
        { type: 'page' as const, page: 1 },
        { type: 'page' as const, page: 2 },
        { type: 'page' as const, page: 3 },
        { type: 'page' as const, page: 4 },
        { type: 'ellipsis' as const, page: 0 },
        { type: 'page' as const, page: totalPages },
      ];
    }

    if (currentPage >= totalPages - 3) {
      return [
        { type: 'page' as const, page: 1 },
        { type: 'ellipsis' as const, page: 0 },
        { type: 'page' as const, page: totalPages - 3 },
        { type: 'page' as const, page: totalPages - 2 },
        { type: 'page' as const, page: totalPages - 1 },
        { type: 'page' as const, page: totalPages },
      ];
    }

    return [
      { type: 'page' as const, page: 1 },
      { type: 'ellipsis' as const, page: 0 },
      { type: 'page' as const, page: currentPage - 1 },
      { type: 'page' as const, page: currentPage },
      { type: 'page' as const, page: currentPage + 1 },
      { type: 'ellipsis' as const, page: 0 },
      { type: 'page' as const, page: totalPages },
    ];
  })();

  if (typeof totalPages === 'number' && currentPage > totalPages) {
    redirect('/blog');
  }

  if (!posts.length) {
    if (currentPage > 1) {
      redirect('/blog');
    }

    if (status === 'missing-config') {
      return (
        <>
          <ColoredHeader />
          <main className="flex-1 bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4095]">
                Blog
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                WordPress-powered blog coming soon
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                Set <span className="font-semibold">NEXT_PUBLIC_WORDPRESS_URL</span> to your WordPress site URL,
                and this page will begin listing your posts automatically.
              </p>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    if (status === 'unavailable') {
      return (
        <>
          <ColoredHeader />
          <main className="flex-1 bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4095]">
                Blog
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                WordPress blog feed unavailable
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                Your WordPress connection is configured, but the blog feed is temporarily unavailable. Check the site URL and try again shortly.
              </p>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    return (
      <>
        <ColoredHeader />
        <main className="flex-1 bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4095]">
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              No posts published yet
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              New blog articles will appear here as soon as they are published on WordPress.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ColoredHeader />
      <main className="flex-1 bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4095]">
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">Latest posts</h1>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            {previousPageHref ? (
              <Link
                href={previousPageHref}
                className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#3E4095] hover:text-[#3E4095]"
              >
                ← Previous page
              </Link>
            ) : null}

            {nextPageHref ? (
              <Link
                href={nextPageHref}
                className="inline-flex rounded-full bg-[#3E4095] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f3379]"
              >
                Next page →
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const featuredImage = getWordPressFeaturedImage(post);
            const categories = getWordPressTerms(post, 'category');
            const tags = getWordPressTerms(post, 'post_tag');

            return (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={getWordPressFeaturedImageAlt(post)}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500">
                    Databliz Blog
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {categories.slice(0, 2).map((category) => (
                      <span
                        key={category.id}
                        className="rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#3E4095]"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">{post.title.rendered}</h2>
                  <p
                    className="mt-4 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }}
                  />

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <span key={tag.id} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        #{tag.name}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex rounded-full bg-[#3E4095] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f3379]"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="text-center">
            <span className="text-sm font-semibold text-slate-600">
              Page {currentPage}
              {typeof totalPages === 'number' ? ` of ${totalPages}` : ''}
            </span>
          </div>

          {typeof totalPages === 'number' && totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paginationItems.map((item, index) => (
                item.type === 'ellipsis' ? (
                  <span key={`ellipsis-${index}`} className="px-1 text-sm font-semibold text-slate-500">
                    …
                  </span>
                ) : (
                  <Link
                    key={item.page}
                    href={`/blog?page=${item.page}`}
                    className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                      item.page === currentPage
                        ? 'border-[#3E4095] bg-[#3E4095] text-white'
                        : 'border-slate-300 text-slate-700 hover:border-[#3E4095] hover:text-[#3E4095]'
                    }`}
                  >
                    {item.page}
                  </Link>
                )
              ))}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            {currentPage > 1 ? (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#3E4095] hover:text-[#3E4095]"
              >
                Previous
              </Link>
            ) : (
              <span />
            )}

            {typeof totalPages === 'number' && currentPage < totalPages ? (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#3E4095] hover:text-[#3E4095]"
              >
                Next
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
