
import {GlobalStyle} from "@/styles/GlobalStyle";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <title>Sportify - Connect Your Skills</title>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"/>

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png"/>
      <link rel="manifest" href=" /favicon_io/site.webmanifest"/>

    </head>
    <GlobalStyle>{children}</GlobalStyle>
    </html>
  );
}
