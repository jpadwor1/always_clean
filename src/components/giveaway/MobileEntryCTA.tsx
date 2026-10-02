'use client';
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function MobileEntryCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('giveaway-hero');
    const entry = document.getElementById('entry');
    if (!hero || !entry) return;
    let heroPassed = false;
    let formVisible = false;
    const observer = new IntersectionObserver(records => {
      records.forEach(record => {
        if (record.target === hero) heroPassed = !record.isIntersecting && record.boundingClientRect.bottom <= 0;
        if (record.target === entry) formVisible = record.isIntersecting;
      });
      setVisible(heroPassed && !formVisible);
    });
    observer.observe(hero);
    observer.observe(entry);
    return () => observer.disconnect();
  }, []);
  return visible ? <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#dac9aa] bg-[#fffaf0] px-4 pb-[calc(11px+env(safe-area-inset-bottom))] pt-[11px] shadow-[0_-4px_20px_#03273720] md:hidden"><span className="text-[9px] font-extrabold text-[#294d5c]">YOUR POOL COULD BE NEXT<small className="block text-[10px] font-normal">Closes October 31, 2026</small></span><a className="flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-[10px] border-b-4 border-[#d2761d] bg-[#ffaf3f] px-4 py-[11px] text-xs font-extrabold tracking-[.05em] text-[#162935] shadow-[0_6px_26px_#ec8e292b] hover:bg-[#ffc773] hover:no-underline" href="#entry">ENTER FREE <ArrowDown size={18} aria-hidden="true" /></a></div> : null;
}
