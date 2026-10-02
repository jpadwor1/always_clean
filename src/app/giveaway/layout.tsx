import FacebookPixelEvents from '@/components/FacebookPixelEvents';

export default function GiveawayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fffaf0] text-[#102c3d] [line-height:1.6] [&_a]:underline-offset-4 [&_a:hover]:underline [&_:focus-visible]:outline [&_:focus-visible]:outline-4 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-[#de7a10]">
      <a href="#giveaway-main" className="absolute -top-24 left-4 z-50 bg-white p-2.5 focus:top-2.5">Skip to content</a>
      <FacebookPixelEvents />
      {children}
      <footer className="flex flex-wrap justify-center gap-x-5 gap-y-3 px-[6%] pb-[calc(110px+env(safe-area-inset-bottom))] pt-6 text-[11px] text-[#526773] md:pb-6"><span className="w-full text-center md:w-auto">© 2026 Krystal Clean Pool Service</span><a className="underline" href="/giveaway/rules">Official Giveaway Rules</a><a className="underline" href="/privacy-policy">Privacy Policy</a></footer>
    </div>
  );
}
