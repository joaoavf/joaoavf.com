import { NextPage } from 'next';
import Link from 'next/link';
import { Head } from '../components';

const ErrorPage: NextPage = () => (
  <div className="max-w-2xl mx-auto">
    <Head
      title="404 | João Ferreira"
      description="The page you’re looking for doesn’t exist. Return to the homepage."
    />

    <div className="text-sm font-semibold tracking-widest uppercase text-accent dark:text-accent-light">
      Error 404
    </div>
    <h1 className="mt-4">Page not found 🥲</h1>
    <p className="mt-6">
      The page you’re looking for doesn’t exist. Return to the{' '}
      <Link href="/">homepage</Link>.
    </p>
  </div>
);

export default ErrorPage;
