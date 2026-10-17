import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

// druhá verze hera na porovnání, do vyhledávačů nepatří
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Hero2() {
  return <HomePage heroBg="machine" />;
}
