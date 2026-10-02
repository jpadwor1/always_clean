export function giveawayConfig() {
  const rulesUrl = process.env.GIVEAWAY_RULES_URL || '/giveaway/rules';
  const consentText = process.env.GIVEAWAY_CONTACT_CONSENT_TEXT || 'I agree to receive calls and text messages from Krystal Clean Pool Service about my giveaway entry, winner or finalist notifications, and related pool service offers at the mobile number provided, including messages sent using automated technology. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.';
  const legalVersion = process.env.GIVEAWAY_LEGAL_VERSION || 'giveaway-contact-consent-2026-10-01';
  const now = new Date();
  const inCampaignWindow = now >= new Date('2026-10-01T00:00:00-07:00') && now < new Date('2026-11-01T00:00:00-07:00');
  const open = inCampaignWindow;
  return { rulesUrl, consentText, legalVersion, open };
}
