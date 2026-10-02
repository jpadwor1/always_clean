import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { retryEntries } from '@/lib/giveaway/automation';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const secret = process.env.GIVEAWAY_RETRY_TOKEN;
  const supplied = Buffer.from(request.headers.get('authorization') || '');
  const expected = Buffer.from(`Bearer ${secret}`);
  if (!secret || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return new NextResponse(null, { status: 401 });
  }
  return NextResponse.json(await retryEntries(), { headers: { 'Cache-Control': 'no-store' } });
}
