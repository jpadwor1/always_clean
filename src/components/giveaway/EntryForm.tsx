'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cities, submissionSchema, interestOptions, maintenanceOptions } from '@/lib/giveaway/schema';
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
export default function EntryForm({ open, rulesUrl, consentText }: { open: boolean; rulesUrl: string; consentText: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const lock = useRef(false);
  const submissionToken = useRef('');
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    let savedToken = '';
    try { savedToken = sessionStorage.getItem('giveaway-submission-token') || ''; } catch { /* Optional storage. */ }
    submissionToken.current = /^[a-f0-9]{64}$/.test(savedToken) ? savedToken : Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join('');
    try { sessionStorage.setItem('giveaway-submission-token', submissionToken.current); } catch { /* Ref survives retries. */ }
    const params = new URLSearchParams(window.location.search);
    let saved: Record<string, string> = {};
    try { saved = JSON.parse(sessionStorage.getItem('giveaway-attribution') || '{}'); } catch { /* Optional storage. */ }
    const next: Record<string, string> = {};
    const fresh = attributionKeys.some(key => params.has(key));
    attributionKeys.forEach(key => { next[key] = (fresh ? params.get(key) || '' : typeof saved?.[key] === 'string' ? saved[key] : '').slice(0, 200); });
    setAttribution(next);
    try { sessionStorage.setItem('giveaway-attribution', JSON.stringify(next)); } catch { /* Still submitted from state. */ }
  }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    setError(''); setErrors({});
    const form = new FormData(event.currentTarget);
    const body = { ...Object.fromEntries(form), ...attribution, submissionToken: submissionToken.current, rulesConsent: form.get('rulesConsent') === 'on', contactConsent: form.get('contactConsent') === 'on' };
    const valid = submissionSchema.safeParse(body);
    if (!valid.success) { setErrors(valid.error.flatten().fieldErrors); setError('Please check the highlighted fields.'); return; }
    lock.current = true; setBusy(true);
    try {
      const response = await fetch('/api/giveaway', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(valid.data) });
      const result = await response.json().catch(() => ({ error: 'We could not confirm your entry. Please try again.' }));
      if (!response.ok || !result.success) { setErrors(result.fields || {}); throw new Error(result.error || 'Your entry could not be saved. Please try again.'); }
      try { sessionStorage.removeItem('giveaway-submission-token'); } catch { /* Optional storage. */ }
      window.location.assign('/giveaway/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection interrupted. Please try again.');
      lock.current = false; setBusy(false);
    }
  }
  function field(name: string, label: string, type = 'text', autoComplete?: string) {
    return <div className="flex min-w-0 flex-col"><label className="mb-1.5 text-[13px] font-semibold" htmlFor={name}>{label}</label><input className="min-h-[50px] w-full rounded-md border border-[#aebfc8] bg-white p-[11px] text-base text-[#183848] disabled:bg-[#f1f4f5] disabled:text-[#64747d] aria-[invalid=true]:border-[#b42318]" id={name} name={name} type={type} autoComplete={autoComplete} required maxLength={name === 'email' ? 254 : name === 'zip' ? 5 : 160} inputMode={name === 'zip' ? 'numeric' : undefined} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} /><span id={`${name}-error`} className="mt-1 text-xs text-[#a5271c]">{errors[name]?.[0]}</span></div>;
  }
  function select(name: string, label: string, options: readonly string[]) {
    return <div className="flex min-w-0 flex-col"><label className="mb-1.5 text-[13px] font-semibold" htmlFor={name}>{label}</label><select className="min-h-[50px] w-full rounded-md border border-[#aebfc8] bg-white p-[11px] text-base text-[#183848] disabled:bg-[#f1f4f5] disabled:text-[#64747d] aria-[invalid=true]:border-[#b42318]" id={name} name={name} required defaultValue="" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined}><option value="" disabled>Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select><span id={`${name}-error`} className="mt-1 text-xs text-[#a5271c]">{errors[name]?.[0]}</span></div>;
  }
  return <form onSubmit={submit} className="min-w-0 rounded-xl bg-white px-[18px] py-[22px] md:p-[30px]">
    {!open && <p className="mb-6 rounded-md border border-[#e7c88f] bg-[#fff3db] p-3.5 text-xs text-[#765319]" role="status">Entries are open October 1–31, 2026. The entry window is currently closed.</p>}
    <fieldset className="mb-[22px] min-w-0" disabled={busy || !open}><legend className="mb-4 text-[17px] font-bold">Your contact details</legend><div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
      {field('firstName', 'First name', 'text', 'given-name')}{field('lastName', 'Last name', 'text', 'family-name')}
      {field('phone', 'Mobile phone', 'tel', 'tel')}{field('email', 'Email', 'email', 'email')}
      <div className="md:col-span-2">{field('address', 'Property / service address', 'text', 'street-address')}</div>
      {select('city', 'City', cities)}{field('zip', 'ZIP', 'text', 'postal-code')}
    </div></fieldset>
    <fieldset className="mb-[22px] min-w-0" disabled={busy || !open}><legend className="mb-4 text-[17px] font-bold">A little about your pool</legend><div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
      {select('ownsHome', 'Do you own this home?', ['Yes', 'No'])}{select('maintenance', 'How is the pool currently maintained?', maintenanceOptions)}
      {select('equipmentIssues', 'Are there current pool-equipment issues?', ['Yes', 'No', 'Not sure'])}{select('interest', 'Primary interest', interestOptions)}
    </div></fieldset>
    {attributionKeys.map(key => <input key={key} type="hidden" name={key} value={attribution[key] || ''} />)}
    <div hidden aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset className="mb-[22px]" disabled={busy || !open}><legend className="mb-4 text-[17px] font-bold">Rules & contact consent</legend>
      <label className="mb-[18px] flex items-start gap-3 text-[13px] text-[#526570]"><input className="mt-[3px] h-[22px] w-[22px] shrink-0 accent-[#126f8d]" type="checkbox" name="rulesConsent" required /> <span>I agree to the <a className="text-[#185c7a] underline" href={rulesUrl} target="_blank" rel="noreferrer">Official Giveaway Rules</a> and acknowledge the <a className="text-[#185c7a] underline" href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.</span></label>
      <label className="mb-[18px] flex items-start gap-3 text-[13px] text-[#526570]"><input className="mt-[3px] h-[22px] w-[22px] shrink-0 accent-[#126f8d]" type="checkbox" name="contactConsent" required /> <span>{consentText}</span></label>
    </fieldset>
    <p ref={errorRef} tabIndex={-1} role="alert" className="mt-1 text-xs text-[#a5271c]">{error}</p>
    <Button className="mt-2 min-h-14 w-full rounded-[10px] border-b-4 border-[#d2761d] bg-[#ffaf3f] px-[34px] py-[15px] text-base font-extrabold tracking-[.05em] text-[#162935] shadow-[0_6px_26px_#ec8e292b] hover:bg-[#ffc773]" type="submit" disabled={busy || !open}>{busy ? 'SAVING YOUR ENTRY…' : 'ENTER FREE'}</Button>
    <p className="mt-3 text-center text-[11px] text-[#516673]">No purchase necessary. October 1–31, 2026.</p>
  </form>;
}
