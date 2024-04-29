
import {GlobalStyle} from "@/styles/GlobalStyle";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <title>Sportify - Connect Your Skills</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet" />
    </head>
    <GlobalStyle>{children}</GlobalStyle>
    </html>
  );
}
