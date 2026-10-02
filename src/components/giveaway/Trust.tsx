'use client';
import { testimonials } from '@/components/Home/testimonial-section';
export default function Trust() {
  const review = testimonials[3];
  return <section className="grid grid-cols-1 items-center gap-6 px-5 py-9 md:grid-cols-2 md:gap-11 md:px-[max(6%,calc((100%-1080px)/2))] md:py-[52px]"><div><p className="mb-4 text-[11px] font-extrabold tracking-[.13em] text-[#936027]">YOUR LOCAL POOL PEOPLE</p><h2 className="mb-5 text-[29px] font-extrabold leading-[1.08] tracking-[-.045em] md:text-[32px]">Real people.<br />Clear-water care.</h2><p className="text-sm text-[#516673] md:text-base">Krystal Clean is a veteran-owned, father-and-son pool service team serving Arizona communities.</p></div><blockquote className="m-0 border-l-[3px] border-[#eaae59] py-2 pl-6"><p className="text-lg leading-normal text-[#294856] md:text-xl">“{review.quote.trim()}”</p><footer className="mt-[18px] text-[13px] font-bold">{review.name} <span className="font-normal">· {review.designation}</span></footer></blockquote></section>;
}
