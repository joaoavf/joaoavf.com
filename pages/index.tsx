import { GetStaticProps, NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Head, Image, PostList } from '../components';
import { generateRssFeed } from '../helpers/generateRssFeed';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { TwitterColorIcon, LinkedInColorIcon, GitHubIcon } from '../icons';
import { PostFrontMatter } from '../types';

interface HomePageProps {
  posts: PostFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Create list with all blog post
  const posts = await getFrontMatterOfPosts();

  // Genearte RSS feed and add it to public directory
  generateRssFeed(
    {
      title: 'Blog posts of João Ferreira',
      description:
        'Learn more about startups, remote work, funding, software and useful tools I use. In the blog posts I share my experience from the past 10+ years.',
    },
    posts
  );

  // Return page props
  return { props: { posts } };
};

// Client side React.js code
const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  // Create search state
  const [search, setSearch] = useState('');

  // Create filtered posts list
  const filteredPosts = useMemo(
    () =>
      posts.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  return (
    <>
      <Head
        title="João Ferreira"
        description="Building an easy way for people to access DeFi."
      />

      <section className="grid gap-8 md:grid-cols-[1fr_15rem] md:gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16 md:items-center animate-fade-up">
        <div className="relative w-20 h-20 md:order-2 md:w-full md:h-auto group">
          <div
            aria-hidden
            className="absolute hidden transition-transform duration-500 md:block -inset-3 rounded-[2rem] bg-accent-bright/50 dark:bg-accent-bright/20 blur-2xl group-hover:scale-105"
          />
          <Image
            className="relative object-cover w-full h-full transition-transform duration-500 rounded-full shadow-lg prevent-default md:aspect-square md:rounded-3xl ring-4 md:ring-1 ring-white dark:ring-ink-800 md:ring-ink-900/10 md:dark:ring-white/10 shadow-ink-900/10 md:shadow-2xl md:group-hover:-rotate-1 md:group-hover:scale-[1.01]"
            src="/images/pfp.jpg"
            alt="João Ferreira"
            sizes="(max-width: 767px) 80px, (max-width: 1023px) 240px, 320px"
          />
        </div>

        <div className="md:order-1">
          <h1 className="lg:text-7xl">Hi, I’m João.</h1>

          <p className="mt-5 font-serif text-2xl md:mt-6 md:text-[1.75rem] lg:text-[2rem] leading-snug md:leading-snug lg:leading-snug text-ink-500 dark:text-ink-400 [text-wrap:balance]">
            I’m the founder and CEO of{' '}
            <a href="https://www.usepicnic.com" target="_blank" rel="noreferrer">
              Picnic
            </a>
            , where we’re{' '}
            <a
              href="https://www.youtube.com/watch?v=aKbsZkxeJNs"
              target="_blank"
              rel="noreferrer"
            >
              making DeFi easy to use
            </a>
            .
          </p>
          <p className="mt-5 text-lg md:mt-6 md:text-lg lg:text-xl">
            DeFi will become the financial rails of the world because it is more
            efficient. Less trust = less risk = lower costs = higher yields.
          </p>
          <p className="mt-5 text-lg md:mt-6 md:text-lg lg:text-xl">
            DeFi is early and still risky. It’s some of the hardest tech there
            is to build. But when technology accelerates, DeFi will shine.
          </p>

          <ul className="flex flex-wrap gap-3 mt-8 prevent-default md:mt-10">
            {[
              {
                Icon: TwitterColorIcon,
                label: 'Twitter',
                href: 'https://twitter.com/joaoavf',
              },
              {
                Icon: LinkedInColorIcon,
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/joaoavf',
              },
              {
                Icon: GitHubIcon,
                label: 'GitHub',
                href: 'https://github.com/joaoavf',
              },
            ].map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  className="inline-flex items-center gap-2 py-2 pl-3 pr-4 text-sm font-medium transition-all bg-white border rounded-full shadow-sm prevent-default border-ink-200 dark:bg-ink-900 dark:border-ink-800 text-ink-700 dark:text-ink-200 hover:-translate-y-0.5 hover:shadow-md hover:border-ink-300 dark:hover:border-ink-700"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="h-4 text-ink-900 dark:text-white">
                    <Icon />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 md:mt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xs font-sans font-semibold tracking-[.18em] uppercase md:text-sm text-ink-500 dark:text-ink-400">
            Writing
          </h2>
          {posts.length > 5 && (
            <input
              className="w-full md:w-64 px-4 py-2 text-sm transition-colors bg-transparent border rounded-full outline-none border-ink-200 dark:border-ink-800 hover:border-ink-300 dark:hover:border-ink-700 focus:border-accent dark:focus:border-accent-light placeholder-ink-400 text-ink-800 dark:text-ink-100"
              type="search"
              placeholder="Search posts…"
              aria-label="Search blog posts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>

        {filteredPosts.length ? (
          <PostList className="mt-4 md:mt-6" posts={filteredPosts} />
        ) : (
          <p className="mt-6">
            The post you are looking for does not exist yet. 😬
          </p>
        )}
      </section>
    </>
  );
};

export default HomePage;
