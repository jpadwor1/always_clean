// Scheduled by Netlify on published deployments; no browser or external cron needed.
export default async function () {
  const site = process.env.URL;
  const token = process.env.GIVEAWAY_RETRY_TOKEN;
  if (!site || !token) throw new Error('Giveaway retry environment is missing.');
  const response = await fetch(new URL('/api/giveaway/retry', site), {
    method: 'POST', headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`Giveaway retry failed (${response.status}).`);
  const result = await response.json();
  if (result.failed) throw new Error('Some giveaway entries still need Airtable sync.');
}
export const config = { schedule: '* * * * *' };
