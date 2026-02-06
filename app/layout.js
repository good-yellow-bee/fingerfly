import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Fingerfly Typing",
  description: "English typing practice for speed and accuracy."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="site-header">
            <div className="container site-header__inner">
              <Link className="brand" href="/">
                Fingerfly
              </Link>
              <nav className="nav">
                <Link href="/lesson/1-basics">Basics</Link>
                <Link href="/lesson/2-letters">Letters</Link>
                <Link href="/lesson/12-words">Words</Link>
                <Link href="/lesson/11-texts">Texts</Link>
              </nav>
            </div>
          </header>
          <main className="container">{children}</main>
          <footer className="site-footer">
            <div className="container">
              <p>Practice intentionally. Speed follows clarity.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
