
import Navbar from "@components/navbar/navbar";

import "@styles/global.css";

export const metadata = {
  title: 'Create Next App',
  description: 'Made for PMW 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

