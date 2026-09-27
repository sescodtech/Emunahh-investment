import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Emunahh-Invest Limited',
  description: 'Structured financial and investment solutions for students, individuals and businesses.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
