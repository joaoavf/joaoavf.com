import { FC } from 'react';
import { PostFrontMatter } from '../types';

interface PostSeparatorProps {
  currentPost: PostFrontMatter;
  previousPost: PostFrontMatter | undefined;
  posts: PostFrontMatter[];
}

export const PostSeparator: FC<PostSeparatorProps> = ({
  currentPost,
  previousPost,
  posts,
}) => {
  // Get year of current and previous post if previous post
  // is available and post list is longer than 4 posts
  if (previousPost && posts.length > 4) {
    const currentYear = currentPost.publishedAt.split('-')[0];
    const previousYear = previousPost.publishedAt.split('-')[0];

    // Display a separator if year of current post
    // is less than year of previous post
    if (currentYear < previousYear) {
      const lineClassName = 'flex-1 h-px bg-ink-200 dark:bg-ink-800';
      return (
        <div className="flex items-center pt-8 pb-2 space-x-6" role="separator">
          <div className={lineClassName} />
          <div className="font-serif text-lg text-ink-500 dark:text-ink-400">
            {currentYear}
          </div>
          <div className={lineClassName} />
        </div>
      );
    }
  }

  // Otherwise display nothing
  return null;
};
