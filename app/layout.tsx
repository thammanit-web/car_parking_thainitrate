import "./globals.css";

export const metadata = {
  title: 'จองคิวจอดรถ',
  icons: {
    icon: ['/favicon.ico']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <link 
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
