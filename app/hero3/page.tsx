import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

// třetí verze hera na porovnání, do vyhledávačů nepatří
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Hero3() {
  return <HomePage heroBg="silhouette" />;
}
