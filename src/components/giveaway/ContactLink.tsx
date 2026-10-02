'use client';
import { trackGiveawayEvent } from '@/components/FacebookPixelEvents';
export default function ContactLink() {
  return <a href="tel:5205255956" onClick={() => { void trackGiveawayEvent('Contact', crypto.randomUUID()).catch(() => {}); }}>Have a pool issue now? Call Krystal Clean</a>;
}
