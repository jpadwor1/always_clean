-- Additive deployment SQL: run once against the intended database after review.
CREATE TABLE "GiveawayEntry" (
  "id" TEXT NOT NULL,
  "campaign" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "legalVersion" TEXT NOT NULL,
  "consentText" TEXT NOT NULL,
  "receiptHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "automationStatus" TEXT NOT NULL DEFAULT 'PENDING',
  "automationAttempts" INTEGER NOT NULL DEFAULT 0,
  "automationError" TEXT,
  "automationLeaseAt" TIMESTAMP(3),
  "automationSentAt" TIMESTAMP(3),
  CONSTRAINT "GiveawayEntry_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GiveawayEntry_receiptHash_key" ON "GiveawayEntry"("receiptHash");
CREATE UNIQUE INDEX "GiveawayEntry_campaign_email_key" ON "GiveawayEntry"("campaign", "email");
CREATE UNIQUE INDEX "GiveawayEntry_campaign_phone_key" ON "GiveawayEntry"("campaign", "phone");
CREATE INDEX "GiveawayEntry_automationStatus_createdAt_idx" ON "GiveawayEntry"("automationStatus", "createdAt");
