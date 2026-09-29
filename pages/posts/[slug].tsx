import { readFileSync, readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import { join } from 'path';
import { useEffect, useMemo } from 'react';
import getReadingTime from 'reading-time';
import { Head, PostImage } from '../../components';
import { fetchDatabase } from '../../helpers/fetchDatabase';
import { formatDate } from '../../helpers/formatDate';
import { useViews } from '../../hooks';
import { PostFrontMatter, Post } from '../../types';

// Build time Node.js code
export async function getStaticPaths() {
  // Get blog post file names
  const fileNames = readdirSync(join(process.cwd(), 'posts'));

  // Retun path of every blog post
  return {
    paths: fileNames.map((fileName) => ({
      params: {
        slug: fileName.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

interface PostPageProps {
  post: Post;
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  // Get slug of post from params
  const slug = params!.slug as string;

  // Read and bundle MDX source code
  const filePath = join(process.cwd(), 'posts', `${slug}.mdx`);
  const mdxSource = readFileSync(filePath, 'utf8');
  const bundleResult = await bundleMDX({ source: mdxSource });

  // Create necessary post data for client
  const sourceCode = bundleResult.code;
  const frontMatter = bundleResult.frontmatter as Pick<
    PostFrontMatter,
    'title' | 'summary' | 'publishedAt'
  >;
  const views = (await fetchDatabase<number>(`/views/${slug}`)) || 0;
  const readingTimeResult = getReadingTime(mdxSource);
  const wordCount = readingTimeResult.words;
  const readingTime = readingTimeResult.text;

  // Return page props
  return {
    props: {
      post: {
        ...frontMatter,
        slug,
        views,
        wordCount,
        readingTime,
        sourceCode,
      },
    },
  };
};

// Client side React.js code
const PostPage: NextPage<PostPageProps> = ({ post }) => {
  // Destructure post object
  const { title, summary, slug, readingTime, sourceCode } = post;

  // Increase views of post by 1
  useEffect(() => {
    fetchDatabase(`/views/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({ '.sv': { increment: 1 } }),
    });
  }, [slug]);

  // Create string for publication date
  const publishedAt = useMemo(
    () => formatDate(post.publishedAt),
    [post.publishedAt]
  );

  // Get current views of post
  const views = useViews(slug, post.views);

  // Convert source code to component
  const BlogPost = useMemo(() => getMDXComponent(sourceCode), [sourceCode]);

  return (
    <div className="max-w-2xl mx-auto">
      <Head title={`${title} | João Ferreira`} description={summary} />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors prevent-default group text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-50"
      >
        <span
          aria-hidden
          className="transition-transform group-hover:-translate-x-1"
        >
          ←
        </span>
        All posts
      </Link>

      <header className="mt-8 mb-12 md:mt-10 md:mb-16 animate-fade-up">
        <h1>{title}</h1>
        {summary && (
          <p className="mt-4 font-serif text-xl italic md:mt-6 md:text-2xl text-ink-500 dark:text-ink-400">
            {summary}
          </p>
        )}
        <div className="flex flex-wrap items-center pb-8 mt-6 text-sm border-b md:mt-8 gap-x-3 gap-y-1 border-ink-200 dark:border-ink-800 text-ink-500 dark:text-ink-400">
          <time dateTime={post.publishedAt}>{publishedAt}</time>
          <span aria-hidden>·</span>
          <span>{readingTime}</span>
          <span aria-hidden>·</span>
          <span>{views} views</span>
        </div>
      </header>

      <article className="prose">
        {/*
        Since the return type "null" was not added to the component types of
        "mdx-bundler", but it is included by default in the "FC" type of React,
        I cast PostImage to "any". In the future, this may be removed again.
        */}
        <BlogPost components={{ Image: PostImage as any }} />
      </article>
    </div>
  );
};

export default PostPage;
