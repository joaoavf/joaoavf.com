import Link from 'next/link';
import { FC } from 'react';
import { formatDate } from '../helpers/formatDate';
import { useViews } from '../hooks';
import { PostFrontMatter } from '../types';

export const PostPreview: FC<PostFrontMatter> = ({
  title,
  summary,
  slug,
  tag,
  publishedAt,
  ...post
}) => {
  const views = useViews(slug, post.views);

  return (
    <Link
      href={`/posts/${slug}`}
      className="grid gap-2 py-6 prevent-default group md:grid-cols-[9rem_1fr_auto] md:gap-8 md:py-8 md:items-baseline"
    >
      <div className="flex gap-3 text-sm md:flex-col md:gap-1 text-ink-500 dark:text-ink-400 tabular-nums">
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        {views !== undefined && <span>{views} views</span>}
      </div>
      <div>
        <h3 className="text-2xl transition-colors md:text-3xl group-hover:text-accent dark:group-hover:text-accent-light">
          {title}
          {tag && (
            <span className="relative ml-3 -top-1 px-2 py-0.5 font-sans text-xs font-semibold tracking-normal align-middle rounded-full bg-accent/10 dark:bg-accent-light/10 text-accent dark:text-accent-light">
              {tag}
            </span>
          )}
        </h3>
        <p className="mt-1 text-base md:mt-2 md:text-lg">{summary}</p>
      </div>
      <span
        aria-hidden
        className="hidden text-xl transition-all md:block text-ink-300 dark:text-ink-600 group-hover:text-accent dark:group-hover:text-accent-light group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
};
