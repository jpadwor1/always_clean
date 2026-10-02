'use client';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

let pixelPromise: Promise<typeof import('react-facebook-pixel')> | undefined;
const sent = new Set<string>();
function pixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return undefined;
  if (!pixelPromise) pixelPromise = import('react-facebook-pixel').then(module => {
    module.default.init(id, undefined, { autoConfig: false, debug: false });
    return module.default;
  }).catch(error => { pixelPromise = undefined; throw error; });
  return pixelPromise;
}
export async function trackGiveawayEvent(event: 'Lead' | 'Contact', eventId: string) {
  const key = `giveaway:${process.env.NEXT_PUBLIC_META_PIXEL_ID}:${event}:${eventId}`;
  const api = await pixel();
  if (!api || sent.has(key)) return;
  try { if (localStorage.getItem(key)) return; } catch { /* Memory fallback. */ }
  api.fbq('track', event, { content_name: 'Halloween Pool Pump Giveaway' }, { eventID: eventId });
  sent.add(key);
  try { localStorage.setItem(key, '1'); } catch { /* Memory fallback. */ }
}
const FacebookPixelEvents = ({ confirmedEntryId, pageViews = true }: { confirmedEntryId?: string; pageViews?: boolean }) => {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    async function track() {
      const api = await pixel();
      if (!api || !active) return;
      if (pageViews && lastPage.current !== pathname) {
        api.pageView(); lastPage.current = pathname;
        if (pathname === '/giveaway') api.track('ViewContent', { content_name: 'Halloween Pool Pump Giveaway' });
      }
      if (confirmedEntryId) await trackGiveawayEvent('Lead', confirmedEntryId);
    }
    void track().catch(() => {});
    return () => { active = false; };
  }, [pathname, confirmedEntryId, pageViews]);

  return null;
};

export default FacebookPixelEvents;
