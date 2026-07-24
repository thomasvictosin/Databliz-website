import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ColoredHeader from '@/components/ColoredHeader';
import Footer from '@/components/Footer';
import {
  getWordPressAuthor,
  getWordPressFeaturedImage,
  getWordPressFeaturedImageAlt,
  getWordPressPostBySlug,
  getWordPressTerms,
} from '@/lib/wordpress';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getWordPressFeaturedImage(post);
  const categories = getWordPressTerms(post, 'category');
  const tags = getWordPressTerms(post, 'post_tag');

  return (
    <>
      <ColoredHeader />
      <main className="flex-1 bg-slate-50 px-6 py-16">
        <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={getWordPressFeaturedImageAlt(post)}
              className="mb-8 h-[320px] w-full rounded-xl object-cover"
            />
          ) : null}

          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category.id} className="rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#3E4095]">
                {category.name}
              </span>
            ))}
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4095]">
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">{post.title.rendered}</h1>
          <p className="mt-3 text-slate-600">By {getWordPressAuthor(post)}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.id} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                #{tag.name}
              </span>
            ))}
          </div>

          <div
            className="prose prose-lg mt-8 max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
          />

          <div className="mt-10 border-t border-slate-200 pt-6">
            <Link
              href="/blog"
              className="rounded-full bg-[#3E4095] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f3379]"
            >
              ← Back to blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const plainExcerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || undefined;

  return {
    title: post.title.rendered,
    description: plainExcerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com'}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title.rendered,
      description: plainExcerpt,
      type: 'article',
      images: getWordPressFeaturedImage(post) ? [getWordPressFeaturedImage(post) as string] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: plainExcerpt,
      images: getWordPressFeaturedImage(post) ? [getWordPressFeaturedImage(post) as string] : undefined,
    },
  };
}
