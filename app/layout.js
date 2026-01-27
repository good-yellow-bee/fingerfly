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
              <a className="brand" href="/">
                Fingerfly
              </a>
              <nav className="nav">
                <a href="/trening/1-podstawy">Basics</a>
                <a href="/trening/2-litery">Letters</a>
                <a href="/trening/12-slowa">Words</a>
                <a href="/trening/11-teksty">Texts</a>
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
