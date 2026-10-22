import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'BEM FH UNNES 2026', description: 'Portal informasi BEM FH UNNES - Kabinet Laksana Adhikara' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
