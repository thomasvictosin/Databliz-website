type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
};

type WordPressMedia = {
  source_url?: string;
  alt_text?: string;
};

type WordPressPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  date: string;
  link: string;
  featured_media?: number;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    author?: Array<{
      name?: string;
    }>;
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressTerm[][];
  };
};

const WORDPRESS_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || process.env.WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, '') || '';

type WordPressFetchResult<T> = {
  data: T;
  totalPages?: number;
  ok: boolean;
  reason?: string;
};

type WordPressPostListResult = {
  posts: WordPressPost[];
  totalPages?: number;
  status: 'ok' | 'empty' | 'unavailable' | 'missing-config';
};

async function wpFetch<T>(path: string): Promise<WordPressFetchResult<T>> {
  if (!WORDPRESS_BASE_URL) {
    return {
      data: [] as T,
      ok: false,
      reason: 'missing-config',
    };
  }

  const endpoint = `${WORDPRESS_BASE_URL.replace(/\/$/, '')}/wp-json/wp/v2/${path}`;

  try {
    const response = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => '');
      console.error(`[wordpress] ${endpoint} failed with ${response.status}: ${responseText}`);

      return {
        data: [] as T,
        ok: false,
        reason: 'unavailable',
      };
    }

    const data = (await response.json()) as T;
    const totalPages = Number(response.headers.get('x-wp-totalpages') || '0');

    return {
      data,
      totalPages: Number.isFinite(totalPages) && totalPages > 0 ? totalPages : undefined,
      ok: true,
    };
  } catch (error) {
    console.error(`[wordpress] ${endpoint} request failed`, error);

    return {
      data: [] as T,
      ok: false,
      reason: 'unavailable',
    };
  }
}

export async function getWordPressPosts(page = 1, perPage = 6): Promise<WordPressPostListResult> {
  const totalPagesResult = await wpFetch<WordPressPost[]>(`posts?page=1&per_page=${perPage}&_embed=1`);
  const pageResult = await wpFetch<WordPressPost[]>(`posts?page=${page}&per_page=${perPage}&_embed=1`);

  if (!WORDPRESS_BASE_URL || totalPagesResult.reason === 'missing-config' || pageResult.reason === 'missing-config') {
    return {
      posts: [],
      status: 'missing-config',
    };
  }

  if (!totalPagesResult.ok || !pageResult.ok) {
    return {
      posts: [],
      totalPages: totalPagesResult?.totalPages,
      status: 'unavailable',
    };
  }

  return {
    posts: pageResult.data ?? [],
    totalPages: totalPagesResult?.totalPages,
    status: pageResult.data?.length ? 'ok' : 'empty',
  };
}

export async function getWordPressPostBySlug(slug: string) {
  const posts = await wpFetch<WordPressPost[]>(`posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  return posts?.data?.[0] ?? null;
}

export function getWordPressFeaturedImage(post: WordPressPost | null) {
  return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
}

export function getWordPressFeaturedImageAlt(post: WordPressPost | null) {
  return post?._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? post?.title?.rendered ?? 'Featured image';
}

export function getWordPressAuthor(post: WordPressPost | null) {
  return post?._embedded?.author?.[0]?.name ?? 'Databliz';
}

export function getWordPressTerms(post: WordPressPost | null, taxonomy: 'category' | 'post_tag' = 'category') {
  const terms = post?._embedded?.['wp:term'] ?? [];
  const matchedGroup = terms.find((group) => group.some((term) => term.taxonomy === taxonomy));
  return matchedGroup?.filter((term) => term.taxonomy === taxonomy) ?? [];
}
