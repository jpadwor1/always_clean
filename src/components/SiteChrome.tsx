'use client';
import { usePathname } from 'next/navigation';
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path === '/giveaway' || path.startsWith('/giveaway/') ? null : <>{children}</>;
}
