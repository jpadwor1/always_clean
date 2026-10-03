# Halloween Pool Pump Giveaway

Routes: `/giveaway`, `/giveaway/thank-you`, `/giveaway/rules`.

## Persistence and duplicate prevention

Neon PostgreSQL is the entry record of truth. `GiveawayEntry` was created in the configured database on October 2, 2026 using the additive `prisma/giveaway.sql`. Existing tables were not changed. The following unique indexes arbitrate simultaneous inserts:

- campaign + normalized email
- campaign + normalized US phone
- receipt hash

The server validates same-origin requests, campaign dates, honeypot, all form fields and a 256-bit random submission token. The browser retains the token in session storage for retries, with a memory fallback. The raw token is stripped before saving the JSON payload; only its SHA-256 hash is stored. The full normalized entry, rules URL, exact consent text/version, timestamp and attribution are committed before delivery is attempted.

A duplicate email or phone returns 409. A repeated receipt with the same normalized payload recovers the original entry without modifying it; an edited payload with that receipt is rejected. A successful response issues an HttpOnly, SameSite receipt cookie. The thank-you page verifies it against Neon, independently of Airtable availability. No runtime test mode or simulated success exists.

## Airtable CRM sync

CRM destination: https://airtable.com/appxxwjvgiV32kyql/tblsWmGejw4QXsWaJ

Accepted entries are mirrored to Giveaway CRM with stable Neon entry IDs, receipt hashes and original submission timestamps. Airtable upsert matches the receipt hash, so retries update the existing mirror. The CRM is not used to decide eligibility or uniqueness. No SMS or email is sent.

The row is a durable outbox. `automationStatus` tracks PENDING → SENDING → DELIVERED/FAILED. A conditional database claim permits one active sync worker per row; two-minute stale claims recover interrupted workers. Final status updates are fenced by the worker's lease timestamp. Failed syncs have a 30-second retry cooldown and retain sanitized errors. Provider requests time out after eight seconds. A failure never undoes the saved entry or prevents a success receipt.

`POST /api/giveaway/retry` requires `Authorization: Bearer <GIVEAWAY_RETRY_TOKEN>` and retries at most two ready rows, oldest attempted first. Counts report delivered, failed and skipped attempts. The Netlify scheduled function `netlify/functions/giveaway-sync.mjs` invokes this endpoint every minute after a published deployment. It uses Netlify's `URL` environment variable and the same retry secret. The schedule does not run locally or automatically on preview deployments. A prolonged outage can produce a backlog; each scheduled run processes up to two entries.

Field names/types are in `src/lib/giveaway/airtable-fields.json`. Keep names aligned with the mapping. `node scripts/setup-giveaway-airtable.cjs` adds missing columns and validates existing types, without deleting records or fields. On October 2 there were no existing campaign records in Airtable to backfill into Neon.

## Environment and deployment

Configure on the deployment host, with function runtime access:

- `DATABASE_URL`: existing Neon PostgreSQL connection.
- `AIRTABLE_PERSONAL_ACCESS_TOKEN`: access to the specified base with records read/write permissions.
- `GIVEAWAY_RETRY_TOKEN`: a strong random server-only secret shared by the Next route and scheduled function.
- Optional base/table overrides and campaign copy in `.env.giveaway.example`.

Local credentials are in ignored `.env`. Never prefix secrets with `NEXT_PUBLIC_`. Schema setup additionally requires Airtable schema read/write permissions; runtime sync does not. Build/install already generates the Prisma client. The database table has been provisioned; application changes and the schedule still require deployment and host environment verification.

## Campaign and rules

October 1 at 00:00 through November 1 at 00:00, 2026, Arizona time (UTC-07:00). Rules completion is deferred, with no legal-approval gate. Finalize the rules URL, contact-consent text/version and privacy content separately.

## Verification

- `node tests/giveaway.cjs`: validation, dates, save-before-sync, failure handling, and Meta events.
- `node tests/giveaway-airtable.cjs`: stable sync mapping, provider errors, receipt replay, worker leases and retry authentication.
- `node scripts/verify-giveaway-airtable.cjs --write`: real synthetic concurrency and sync check with cleanup of only the records created by that run.

Live verification passed October 2, 2026: eight simultaneous submissions yielded one accepted entry and seven duplicates; four same-receipt retries recovered that entry. Separate six-way email and phone races each accepted exactly one entry. Receipt verification, Airtable field mapping and recovery after a simulated provider outage passed. The retry updated the same Airtable record. All synthetic records were removed from Neon and Airtable. This exercises the actual server handler and APIs, not a deployed browser UI.

The confirmed Neon entry ID is the opaque Meta Lead event ID. No contact details are included as event parameters. Tracking needs separate deployment verification.

## Meta Pixel

Pixel ID: `7174041372672275`, included as the public code default and configured locally and in `.env.giveaway.example`. `NEXT_PUBLIC_META_PIXEL_ID` optionally overrides it at build time; an explicitly empty value disables tracking. Redeploy after code or build-variable changes. A live-site inspection found that an earlier deployment omitted this variable and did not initialize the Pixel; the code default fixes that missing-variable case once deployed.

The giveaway layout owns PageView tracking for the funnel, including client-side route changes. The landing page also sends ViewContent. The receipt-verified thank-you page sends Lead using the Neon entry ID; it does not send an additional PageView. Lead is deduplicated by Pixel ID and entry ID using localStorage, with an in-memory fallback. Clearing or blocking storage limits deduplication across reloads. The call link sends Contact. Form values are not passed as event parameters or advanced-matching data; automatic configuration is disabled.

The installed React Pixel library uses Meta's standard fbevents.js loader. Do not also paste the raw base snippet into the site or a tag manager, which would add duplicate initialization/events. Tracking is scoped to the giveaway funnel; this change does not enable site-wide Pixel tracking or alter the site's cookie-consent UI.

`node tests/meta-pixel.cjs` verifies the actual installed library's script URL, init ID, PageView command and Lead event ID against a fake DOM. `node tests/giveaway.cjs` checks route visits, confirmed-only Lead, repeated-event suppression and Contact. These checks send no traffic to Meta. After deployment, use Meta Events Manager's Test Events to verify receipt of PageView/ViewContent, then a genuine saved entry's Lead and the call link's Contact. Browser blocking can prevent delivery; Conversions API is not configured.

References: [Netlify scheduled functions](https://docs.netlify.com/build/functions/scheduled-functions/), [PostgreSQL unique constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS).
