import type { AppProps } from 'next/app';
import { Inter, Newsreader } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trackAnalyticsPageview } from '../helpers/trackAnalyticsPageview';
import { ThemeIcon } from '../icons';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  // Add Next.js router hook
  const router = useRouter();

  // Create theme state
  const [theme, setTheme] = useState<'light' | 'dark'>();

  // Track Google Analytics pageviews when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', trackAnalyticsPageview);
    return () => {
      router.events.off('routeChangeComplete', trackAnalyticsPageview);
    };
  }, [router.events]);

  // Set initial theme from the class applied by the script in _document
  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }, []);

  // Add or remove dark class and remember choice when theme changes
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Storage may be unavailable (e.g. private mode); theme still applies
    }
    setTheme(nextTheme);
  };

  // Create background color depending on theme
  const bgColor = theme === 'dark' ? '#0f0f0e' : '#fafaf8';

  return (
    <>
      <Head>
        <meta name="theme-color" content={bgColor} />
        <meta name="msapplication-TileColor" content={bgColor} />
      </Head>

      <div
        className={`${sans.variable} ${serif.variable} relative flex flex-col min-h-screen font-sans isolate`}
      >
        {/* Soft warm glow at the top of the page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[36rem] pointer-events-none bg-[radial-gradient(60%_60%_at_50%_0%,rgba(200,245,42,0.18),transparent)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(200,245,42,0.07),transparent)]"
        />

        <header className="sticky top-0 z-20 border-b border-transparent bg-paper/70 dark:bg-paper-dark/70 backdrop-blur-md supports-[backdrop-filter]:border-ink-900/5 dark:supports-[backdrop-filter]:border-white/5">
          <nav className="container flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight transition-colors prevent-default md:text-2xl text-ink-900 dark:text-ink-50 hover:text-accent dark:hover:text-accent-light"
            >
              João Ferreira
            </Link>

            <div className="flex items-center gap-1 text-sm font-medium text-ink-500 dark:text-ink-400">
              <a
                className="px-3 py-2 transition-colors rounded-full prevent-default hover:text-ink-900 hover:bg-ink-900/5 dark:hover:text-ink-50 dark:hover:bg-white/5"
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
              >
                RSS
              </a>

              <button
                className="box-content w-4 h-4 p-2.5 transition-colors rounded-full hover:text-ink-900 hover:bg-ink-900/5 dark:hover:text-ink-50 dark:hover:bg-white/5"
                onClick={toggleTheme}
                type="button"
                aria-label="Toggle dark mode"
              >
                <ThemeIcon />
              </button>
            </div>
          </nav>
        </header>

        <main className="container flex-1 w-full pt-14 pb-24 md:pt-20 md:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="container w-full">
          <div className="py-8 text-sm border-t border-ink-200 dark:border-ink-800 text-ink-500 dark:text-ink-400">
            <div>&copy; {new Date().getFullYear()} João Ferreira</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
