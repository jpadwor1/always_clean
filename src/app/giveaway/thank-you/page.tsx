import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { findEntryByReceipt } from '@/lib/giveaway/entries';
import FacebookPixelEvents from '@/components/FacebookPixelEvents';
import Trust from '@/components/giveaway/Trust';
import ContactLink from '@/components/giveaway/ContactLink';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Entry received | Krystal Clean Giveaway', robots: { index: false, follow: false } };
export default async function ThankYouPage() {
  const receipt = cookies().get('giveaway_receipt')?.value;
  if (!receipt || !/^[a-f0-9]{64}$/.test(receipt)) redirect('/giveaway#entry');
  const entry = await findEntryByReceipt(receipt);
  if (!entry) redirect('/giveaway#entry');
  const confirmedEntryId = entry.id;
  return <main id="giveaway-main"><FacebookPixelEvents confirmedEntryId={confirmedEntryId} pageViews={false} /><section className="mx-auto max-w-[900px] px-[6%] py-[52px] text-center"><p className="mb-4 text-[11px] font-extrabold tracking-[.13em] text-[#936027]">ENTRY SUCCESSFULLY RECEIVED</p><h1 className="mb-5 text-[clamp(36px,6vw,62px)] font-extrabold tracking-[-.04em]">You’re In 🎃</h1><p className="text-[#516673]">Your giveaway entry has been successfully received.</p><div className="my-[35px] rounded-xl bg-[#082b3e] p-[34px] text-white"><h2 className="mb-5 text-[27px] font-extrabold leading-[1.08] tracking-[-.045em]">A chance at a fresh start for your pool.</h2><p className="text-[#c8e1ec]">Complete pool pump system + professional installation</p><strong className="mt-[15px] block text-[25px] text-[#ffce88]">Up to $4,000 value</strong></div><h2 className="mb-5 text-[27px] font-extrabold leading-[1.08] tracking-[-.045em]">What happens next?</h2><p className="text-[#516673]">Winner selection begins after October 31, 2026. Watch your phone and email—Krystal Clean will contact the winner and qualifying finalists directly.</p><div className="mt-[30px] text-[13px] underline"><ContactLink /></div></section><Trust /></main>;
}
