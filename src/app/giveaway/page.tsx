import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, Check, Ticket } from 'lucide-react';
import EntryForm from '@/components/giveaway/EntryForm';
import Trust from '@/components/giveaway/Trust';
import MobileEntryCTA from '@/components/giveaway/MobileEntryCTA';
import { giveawayConfig } from '@/lib/giveaway/config';
import { cities } from '@/lib/giveaway/schema';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Halloween Pool Pump Giveaway | Krystal Clean',
  description: 'Win a complete pool pump system + professional installation — up to $4,000 value. Enter free October 1–31, 2026. No purchase necessary.',
};
const section = 'px-5 py-9 md:px-[max(6%,calc((100%_-_1080px)/2))] md:py-[52px]';
const eyebrow = 'mb-4 text-[11px] font-extrabold tracking-[.13em] text-[#936027]';
const heading = 'mb-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-.045em]';
const cta = 'inline-flex min-h-14 items-center justify-center gap-9 rounded-[10px] border-b-4 border-[#d2761d] bg-[#ffaf3f] px-[34px] py-[15px] text-base font-extrabold tracking-[.05em] text-[#162935] shadow-[0_6px_26px_#ec8e292b] transition hover:-translate-y-px hover:bg-[#ffc773] hover:no-underline';
const CTA = () => <a className={cta} href="#entry">ENTER FREE <ArrowDown size={20} aria-hidden="true" /></a>;

export default function GiveawayPage() {
  const config = giveawayConfig();
  return (
    <main id="giveaway-main">
      <section className="relative isolate overflow-hidden bg-[#082d40] text-white" id="giveaway-hero">
        <Image className="-z-30 object-cover object-[65%_center] md:object-[center_60%]" src="/pool.webp" fill priority sizes="100vw" alt="" />
        <Image className="absolute left-3 top-2 z-10 h-[76px] w-[76px] object-contain md:left-[4%] md:top-3 md:h-28 md:w-28" src="/logos/HalloweenLogo.png" width={220} height={220} alt="Krystal Clean Pool Service" priority />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#061f33f2,#082e44bc),linear-gradient(0deg,#08344be8,transparent)] md:bg-[linear-gradient(90deg,#06254199,#061e33eb_35%,#061e33eb_65%,#06254199),linear-gradient(0deg,#042c43b3,#06254130)]" aria-hidden="true" />
        <div className="absolute -right-3.5 top-[45px] -z-10 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6ce,#eab36a)] opacity-65 shadow-[0_0_90px_#eeb35650] md:right-[5%] md:top-[7%] md:h-[clamp(120px,13vw,170px)] md:w-[clamp(120px,13vw,170px)] md:opacity-100" aria-hidden="true" />
        <div className="absolute right-[5px] top-[115px] -z-10 flex rotate-[-15deg] gap-2 text-[#082537] opacity-70 md:right-[3%] md:top-[22%] md:opacity-100" aria-hidden="true">{[0, 1, 2].map((bat, index) => <svg className={index === 0 ? 'h-[25px] w-10 md:h-10 md:w-[70px]' : index === 1 ? 'h-[25px] w-[25px] translate-y-[30px] md:w-[50px]' : 'hidden h-10 w-9 md:block'} key={bat} viewBox="0 0 40 22" fill="currentColor"><path d="M0 12Q7 0 15 8L17 3L20 7L23 3L25 8Q33 0 40 12Q30 9 26 20Q20 14 14 20Q10 9 0 12Z" /></svg>)}</div>
        <div className="relative mx-auto max-w-[760px] px-5 pb-[34px] pt-20 text-center md:px-6 md:pb-12 md:pt-[38px]">
          <p className="mb-2.5 inline-block text-[10px] font-bold tracking-[.035em] text-[#ffce8c] md:mb-[15px] md:text-[11px] md:tracking-[.1em]">🎃 HALLOWEEN POOL PUMP GIVEAWAY</p>
          <h1 className="font-black leading-[.95] tracking-[-.045em]"><span className="block text-[clamp(90px,28vw,138px)] tracking-[-.075em] text-[#ffbb55] [text-shadow:3px_5px_0_#b860233b] md:text-[clamp(100px,12vw,164px)]">WIN</span><span className="mx-auto mt-1.5 block max-w-[600px] text-[clamp(31px,8.6vw,49px)] md:text-[clamp(32px,4vw,52px)]">A COMPLETE<br /><em className="not-italic text-[#79d8f5]">POOL PUMP</em> SYSTEM</span></h1>
          <p className="mt-4 text-xs font-semibold tracking-[.015em] text-white md:mt-[18px] md:text-sm md:tracking-[.055em]">+ PROFESSIONAL INSTALLATION</p>
          <div className="mb-[15px] mt-[17px] flex items-center justify-center gap-2.5 text-[#ffdaad] md:mt-[19px]"><span className="text-[11px] tracking-[.12em]">UP TO</span> <strong className="text-[39px] font-extrabold leading-none tracking-[-.045em] text-[#ffbc62] md:text-[42px]">$4,000</strong> <span className="text-[11px] tracking-[.12em]">VALUE</span></div>
          <p className="mb-3.5 text-[11px] font-bold text-white md:mb-4 md:text-xs">ENTER FREE OCTOBER 1–31 <span className="ml-2 text-[#bdd8e3]">2026</span></p>
          <span className="block [&>a]:w-full md:[&>a]:w-auto"><CTA /></span>
          <p className="mt-[11px] text-[11px] text-[#d6e6ec] md:text-xs">No tricks. No purchase necessary.</p>
        </div>
        <span className="block px-5 pb-3 text-center text-[8px] text-[#d3e7ed] md:absolute md:inset-x-5 md:bottom-3 md:p-0 md:text-[9px]">Pool shown for atmosphere. Prize equipment may vary.</span>
      </section>

      <section className={`${section} bg-[#fff4df]`} aria-labelledby="prize-title">
        <div className="grid rotate-[-1deg] grid-cols-1 overflow-hidden rounded-[15px] bg-[#fffdf7] drop-shadow-[0_10px_14px_#6339100b] md:grid-cols-[230px_1fr]">
          <div className="flex items-center justify-start gap-2.5 border-b-2 border-dashed border-[#ac732b] bg-[#ffbd62] px-[19px] py-3.5 text-[#273642] md:flex-col md:items-start md:justify-center md:border-b-0 md:border-r-2 md:p-[30px]"><Ticket className="h-[25px] w-[25px] md:h-[34px] md:w-[34px]" aria-hidden="true" /><span className="text-[9px] font-bold tracking-[.13em] md:text-[10px]">ONE GRAND PRIZE</span><strong className="ml-auto text-[13px] font-black leading-[1.15] tracking-[-.035em] md:ml-0 md:text-[29px] md:leading-none">ALL TREAT.<br />NO TRICKS.</strong></div>
          <div className="px-5 py-[23px] md:px-[38px] md:py-[30px]">
            <p className={eyebrow}>WHAT YOU COULD WIN</p>
            <h2 className="mb-[18px] text-[29px] font-extrabold leading-[1.08] tracking-[-.045em] md:text-[clamp(28px,3vw,37px)]" id="prize-title">New pump.<br /><span className="text-[#147592]">Big Halloween energy.</span></h2>
            <ul className="m-0 list-none p-0">{['Complete variable-speed pool pump system', 'Professional installation included', 'Up to $4,000 total advertised value'].map(item => <li className="mt-2.5 flex items-start gap-2.5 text-[13px] md:items-center md:text-sm" key={item}><Check className="mt-0.5 w-[17px] shrink-0 text-[#177b91] md:mt-0" aria-hidden="true" /> {item}</li>)}</ul>
          </div>
        </div>
        <div className="mt-[30px] grid grid-cols-1 gap-[18px] md:mt-10 md:grid-cols-2 md:gap-[30px]">
          <div><h2 className="mb-2.5 text-[25px] font-extrabold leading-[1.08] tracking-[-.045em]">How to enter? Easy.</h2><p className="max-w-[360px] text-sm text-[#516673]">Your pool details. Your free entry. Then a little Halloween luck.</p></div>
          <ol className="m-0 list-none p-0">{['Fill out the form', 'Submit your entry', 'Watch your phone & email'].map((item, index) => <li className="mb-2.5 flex items-center gap-[11px] text-sm font-semibold" key={item}><span className="grid h-[27px] w-[27px] place-items-center rounded-full bg-[#133e52] text-xs text-white">{index + 1}</span>{item}</li>)}</ol>
        </div>
        <div className="mt-[18px] border-t border-[#dfcaa7] pt-[23px] text-sm md:mt-7"><strong>Pool in our service area?</strong><p className="mt-1 text-[#365b6c]">{cities.join(' · ')}</p><span className="mt-2 block text-xs text-[#596771]">Tell us about your property below. <a className="underline" href={config.rulesUrl}>Official rules determine eligibility.</a></span></div>
      </section>

      <section id="entry" className={`${section} grid scroll-mt-3 grid-cols-1 gap-6 bg-[#0b3449] px-4 md:grid-cols-[.8fr_1.25fr] md:gap-[55px]`}>
        <div className="px-1 md:px-0"><p className="mb-4 text-[11px] font-extrabold tracking-[.13em] text-[#ffcd85]">🎃 THIS COULD BE YOUR TREAT</p><h2 className="mb-3 text-[38px] font-extrabold leading-[1.08] tracking-[-.045em] text-white md:mb-5 md:text-[clamp(36px,5vw,60px)]">Go on. <br className="hidden md:block" /><span className="text-[#ffbe67]">Throw your <br className="hidden md:block" />name in.</span></h2><p className="text-sm text-[#c0d9e4] md:text-base">Enter for your chance to win the complete pool pump system + professional installation.</p><div className="mt-4 flex items-center gap-3.5 border-t border-dashed border-[#63808a] pt-3 text-[13px] font-bold text-[#ffcb7f] md:mt-5 md:py-5"><Ticket className="h-8 w-8" aria-hidden="true" /><span>YOUR FREE ENTRY<small className="mt-1 block text-[10px] font-normal text-[#c0d9e4]">OCTOBER 1–31, 2026</small></span></div></div>
        <EntryForm {...config} />
      </section>
      <Trust />
      <section className={`${section} bg-[#f0f5f3]`}><p className={eyebrow}>BEFORE YOU SAY “BOO…”</p><h2 className={heading}>A few quick answers.</h2>{[
        ['What exactly could I win?', 'A complete variable-speed pool pump system plus professional installation, with an advertised value of up to $4,000.'],
        ['Is it really free to enter?', 'Yes! No purchase necessary. Complete the entry form during October 1–31, 2026.'],
        ['Who can enter?', 'The giveaway serves Maricopa, Queen Creek, San Tan Valley, Florence, and Coolidge. Final eligibility is governed by the Official Giveaway Rules.'],
        ['When will I hear about the winner?', 'Winner selection begins after October 31. Watch your phone and email—Krystal Clean will contact the winner and qualifying finalists directly.'],
      ].map(([question, answer]) => <details className="group border-b border-[#cddbdc] py-5" key={question}><summary className="flex cursor-pointer list-none justify-between gap-5 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">{question}<span className="text-[#9d652b] transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="pt-3.5 text-sm text-[#516673]">{answer}</p></details>)}<p className="mt-[26px] flex gap-[22px] text-xs"><a className="underline" href={config.rulesUrl}>Official Giveaway Rules</a><a className="underline" href="/privacy-policy">Privacy Policy</a></p></section>
      <section className={`${section} bg-[#0b3449] text-center text-white`}><span className="mb-3 block text-[44px]" aria-hidden="true">🎃</span><h2 className={heading}>A little luck.<br /><span className="text-[#ffbe67]">A whole new pump.</span></h2><p className="text-[#c4d7e1]">Complete pool pump system + professional installation.<br />Up to $4,000 value. No purchase necessary.</p><span className="mt-6 inline-block"><CTA /></span><p className="mt-3 text-center text-[11px] text-[#c4d7e1]">ENTER FREE OCTOBER 1–31, 2026</p></section>
      <MobileEntryCTA />
    </main>
  );
}
