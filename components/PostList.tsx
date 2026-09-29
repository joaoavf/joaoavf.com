import { FC } from 'react';
import { PostFrontMatter } from '../types';
import { PostPreview } from './PostPreview';
import { PostSeparator } from './PostSeparator';

interface PostListProps {
  className?: string;
  posts: PostFrontMatter[];
}

export const PostList: FC<PostListProps> = ({ className = '', posts }) => (
  <ul
    className={`prevent-default border-y divide-y border-ink-200 divide-ink-200 dark:border-ink-800 dark:divide-ink-800 ${className}`}
  >
    {posts.map((post, index) => (
      <li key={post.slug}>
        <PostSeparator
          currentPost={post}
          previousPost={posts[index - 1]}
          posts={posts}
        />
        <PostPreview {...post} />
      </li>
    ))}
  </ul>
);
