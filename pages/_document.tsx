import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { analyticsTrackingId, websiteUrl } from '../config';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href={`${websiteUrl}/rss.xml`}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsTrackingId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsTrackingId}');
              `,
            }}
          />
          {/* Apply theme before first paint to avoid a flash of the wrong theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
