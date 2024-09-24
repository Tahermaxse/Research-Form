import Navbar from '@/components/Navbar';
import RightSide from '@/components/RightSide';
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'A research form built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex min-h-screen bg-gray-100">
        <div className="w-full max-w-full bg-white p-8">
          <Navbar />
          {children}  {/* This will render the child content */}
        </div>
        <RightSide />
      </body>
    </html>
  );
}
