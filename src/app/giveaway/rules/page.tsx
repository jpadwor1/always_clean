import Link from 'next/link';

export const metadata = { title: 'Official Giveaway Rules | Krystal Clean', robots: { index: false } };

export default function RulesPage() {
  return (
    <main id="giveaway-main" className="mx-auto min-h-[70vh] max-w-4xl px-5 py-[52px] md:px-10">
      <p className="mb-4 text-[11px] font-extrabold tracking-[.13em] text-[#936027]">KRYSTAL CLEAN HALLOWEEN PUMP GIVEAWAY</p>
      <h1 className="mb-8 text-[clamp(36px,6vw,62px)] font-extrabold leading-tight tracking-[-.04em]">Official Giveaway Rules</h1>
      <article aria-label="Official Giveaway Rules" className="text-base leading-relaxed text-[#36505f]">
        <p className="mb-5"><strong>{"NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER OR WIN. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID OUTSIDE THE ELIGIBLE AREA AND WHERE PROHIBITED BY LAW."}</strong></p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"1. Sponsor"}</h2>
        <p className="mb-5">{"The Krystal Clean Halloween Pump Giveaway (“Giveaway”) is sponsored by "}<strong>{"Krystal Clean Pool Service"}</strong>{", operated by "}<strong>{"Krystal Clean Pool Service LLC"}</strong>{" (“Sponsor”), located at "}<strong>{"11676 E Sunflower Ln. Florence, AZ 85132"}</strong>{"."}</p>
        <p className="mb-5">{"The Giveaway is administered solely by Sponsor."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"2. Giveaway Period"}</h2>
        <p className="mb-5">{"The Giveaway begins at "}<strong>{"12:00 a.m. Arizona time on October 1, 2026"}</strong>{" and ends at "}<strong>{"11:59 p.m. Arizona time on October 31, 2026"}</strong>{" (“Giveaway Period”)."}</p>
        <p className="mb-5">{"Sponsor’s computer systems and entry records will be the official timekeeping method for the Giveaway."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"3. Eligibility"}</h2>
        <p className="mb-5">{"The Giveaway is open to legal residents of Arizona who:"}</p>
        <ul className="mb-5 list-disc space-y-2 pl-6">
          <li>{"Are at least eighteen (18) years old at the time of entry;"}</li>
          <li>{"Own a residential property with a swimming pool located within Krystal Clean Pool Service’s eligible service area in "}<strong>{"Florence, San Tan Valley, Coolidge, Queen Creek, or Maricopa, Arizona"}</strong>{"; and"}</li>
          <li>{"Have the legal authority to authorize work on the pool and pool equipment at the property where the prize would be installed."}</li>
        </ul>
        <p className="mb-5">{"Current Krystal Clean customers are eligible to participate. Being a current customer, becoming a customer, purchasing a service, requesting a quote, or purchasing any product or repair will "}<strong>{"not"}</strong>{" increase an entrant’s chances of winning."}</p>
        <p className="mb-5">{"Employees, owners, officers, contractors, and immediate household members of Sponsor are not eligible to enter."}</p>
        <p className="mb-5">{"Sponsor may verify an entrant’s eligibility and service address before awarding the prize."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"4. How to Enter"}</h2>
        <p className="mb-5">{"During the Giveaway Period, visit the official Krystal Clean Halloween Pump Giveaway landing page or authorized entry form and submit the requested information."}</p>
        <p className="mb-5">{"A valid entry may require information including the entrant’s name, telephone number, email address, city, and information regarding the residential pool or property."}</p>
        <p className="mb-5"><strong>{"Limit one (1) entry per person and one (1) entry per residential property during the Giveaway Period."}</strong></p>
        <p className="mb-5">{"Duplicate, automated, fraudulent, incomplete, inaccurate, or otherwise invalid entries may be disqualified."}</p>
        <p className="mb-5">{"No purchase, service appointment, estimate, repair, subscription, or payment is required to enter or win."}</p>
        <p className="mb-5">{"Consent to receive advertising or promotional text messages is "}<strong>{"not required to enter or win"}</strong>{"."}</p>
        <p className="mb-5">{"Sponsor may contact entrants using the information submitted with their entry when reasonably necessary to administer the Giveaway, including to confirm an entry, verify eligibility, or contact a potential winner."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"5. Grand Prize"}</h2>
        <p className="mb-5">{"One (1) eligible entrant will receive the "}<strong>{"Krystal Clean Variable-Speed Pool Pump Upgrade Package"}</strong>{", consisting of:"}</p>
        <p className="mb-5"><strong>{"One variable-speed swimming pool pump system selected by Sponsor based upon the winner’s existing pool configuration, plus standard professional installation by Krystal Clean Pool Service."}</strong></p>
        <p className="mb-5">{"The "}<strong>{"total approximate retail value (“ARV”) of the Grand Prize is up to $4,000."}</strong></p>
        <p className="mb-5">{"The actual value of the prize will depend upon the equipment selected, compatibility with the winner’s pool system, installation requirements, and other site-specific conditions."}</p>
        <p className="mb-5">{"If the actual retail value is less than $4,000, the winner will "}<strong>{"not"}</strong>{" receive the difference in cash, credit, equipment, or additional services."}</p>
        <p className="mb-5">{"The specific manufacturer, model, horsepower, configuration, and related equipment will be selected by Sponsor based upon compatibility, availability, applicable installation requirements, and the characteristics of the winning property."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"6. Standard Installation"}</h2>
        <p className="mb-5">{"The prize includes the labor and ordinary installation materials reasonably necessary for a standard variable-speed pump replacement or installation at one qualifying residential swimming pool."}</p>
        <p className="mb-5">{"The prize does not automatically include unrelated repairs or upgrades such as:"}</p>
        <p className="mb-5">{"Electrical service or electrical-panel upgrades; extensive rewiring; major plumbing reconstruction; trenching; concrete or structural modifications; relocation of pool equipment; replacement of filters, heaters, salt systems, automation systems, or other unrelated pool equipment; correction of pre-existing code violations; or remediation of unsafe existing conditions."}</p>
        <p className="mb-5">{"The winner will "}<strong>{"never be required to purchase additional products or services from Sponsor in order to win the Giveaway."}</strong></p>
        <p className="mb-5">{"Before installation, Sponsor may conduct a complimentary site inspection to determine equipment compatibility and whether the installation can be completed safely and legally."}</p>
        <p className="mb-5">{"If unusual site conditions make the advertised installation unsafe, unlawful, or commercially impractical, Sponsor may substitute reasonably comparable pool equipment or services within the stated prize value. Sponsor will not require the winner to purchase corrective or additional work as a condition of receiving the prize."}</p>
        <p className="mb-5">{"Any optional upgrades or work requested by the winner beyond the prize package are separate from the Giveaway and may be purchased only at the winner’s voluntary election."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"7. Winner Selection and Odds"}</h2>
        <p className="mb-5">{"One (1) potential Grand Prize winner will be selected by "}<strong>{"random drawing from all eligible entries received during the Giveaway Period"}</strong>{"."}</p>
        <p className="mb-5">{"The drawing is expected to occur "}<strong>{"on or about November 2, 2026"}</strong>{"."}</p>
        <p className="mb-5">{"The odds of winning depend upon the total number of eligible entries received."}</p>
        <p className="mb-5">{"Purchasing products or services from Krystal Clean Pool Service does not improve the odds of winning."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"8. Winner Notification"}</h2>
        <p className="mb-5">{"The potential winner will be contacted using one or more of the contact methods provided with the entry, which may include telephone, text message, or email."}</p>
        <p className="mb-5">{"The potential winner must respond within "}<strong>{"forty-eight (48) hours"}</strong>{" of Sponsor’s initial notification attempt."}</p>
        <p className="mb-5">{"The potential winner may be required to provide reasonable documentation confirming:"}</p>
        <ul className="mb-5 list-disc space-y-2 pl-6">
          <li>{"Identity and age;"}</li>
          <li>{"Arizona residency;"}</li>
          <li>{"Ownership of the eligible property;"}</li>
          <li>{"Authority to authorize installation; and"}</li>
          <li>{"Any information reasonably required for tax reporting or prize fulfillment."}</li>
        </ul>
        <p className="mb-5">{"The entrant is not considered the official winner until Sponsor verifies eligibility."}</p>
        <p className="mb-5">{"If the potential winner cannot be contacted, fails to respond within the required time, refuses the prize, provides inaccurate information, or is determined to be ineligible, the potential winner may be disqualified and Sponsor may randomly select an alternate potential winner."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"9. Prize Conditions"}</h2>
        <p className="mb-5">{"The prize is non-transferable and may not be exchanged or redeemed for cash by the winner."}</p>
        <p className="mb-5">{"No substitution may be requested by the winner."}</p>
        <p className="mb-5">{"Sponsor reserves the right to substitute equipment or a prize of reasonably comparable value if advertised equipment becomes unavailable or if substitution is reasonably necessary because of compatibility, supply, safety, or installation requirements."}</p>
        <p className="mb-5">{"Installation must take place at the qualifying residential property associated with the winning entry unless Sponsor agrees otherwise in writing."}</p>
        <p className="mb-5">{"The winner agrees to reasonably cooperate with Sponsor in scheduling any required site inspection and installation."}</p>
        <p className="mb-5">{"Installation is subject to reasonable scheduling availability, equipment availability, weather, site accessibility, applicable permitting requirements, and other circumstances outside Sponsor’s reasonable control."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"10. Taxes"}</h2>
        <p className="mb-5">{"The winner is responsible for any federal, state, or local taxes associated with receiving the prize."}</p>
        <p className="mb-5">{"Sponsor may request information or documentation reasonably necessary to satisfy applicable tax-reporting requirements and may issue any tax forms required by law."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"11. Publicity"}</h2>
        <p className="mb-5">{"Except where prohibited by law, acceptance of the prize grants Sponsor permission to use the winner’s first name, last initial, city, photograph, likeness, statements regarding the Giveaway, and photographs or video of the completed installation for reasonable promotional and advertising purposes without additional compensation."}</p>
        <p className="mb-5">{"Any participation in promotional photography or video beyond documentation reasonably associated with prize fulfillment will be subject to applicable law."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"12. Privacy and Communications"}</h2>
        <p className="mb-5">{"Information collected in connection with the Giveaway will be used to administer the Giveaway, verify eligibility, communicate with entrants regarding the Giveaway, fulfill the prize, prevent fraud, and comply with applicable law."}</p>
        <p className="mb-5">{"Entry into the Giveaway does "}<strong>{"not"}</strong>{" require an entrant to consent to unrelated promotional calls or text messages."}</p>
        <p className="mb-5">{"If entrants are offered the opportunity to separately opt in to marketing communications from Krystal Clean Pool Service, that consent is voluntary and has no effect on eligibility or odds of winning."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"13. General Conditions"}</h2>
        <p className="mb-5">{"By participating, entrants agree to comply with these Official Rules and acknowledge that Sponsor’s reasonable decisions regarding interpretation and administration of the Giveaway are final, subject to applicable law."}</p>
        <p className="mb-5">{"Sponsor reserves the right to disqualify any entrant who Sponsor reasonably determines has attempted to manipulate the entry process, submit fraudulent entries, interfere with the Giveaway, provide false information, violate these Official Rules, or act in an abusive or disruptive manner."}</p>
        <p className="mb-5">{"Sponsor is not responsible for entries that are lost, late, incomplete, corrupted, misdirected, technically defective, or not received because of internet, telecommunications, website, platform, or equipment failures outside Sponsor’s reasonable control."}</p>
        <p className="mb-5">{"If fraud, technical failures, unauthorized intervention, natural disaster, government action, or another event outside Sponsor’s reasonable control materially affects the integrity or operation of the Giveaway, Sponsor may modify, suspend, or terminate the Giveaway as reasonably necessary and permitted by law."}</p>
        <p className="mb-5">{"If the Giveaway is terminated early, Sponsor may select a winner from eligible entries received before termination when lawful and reasonably practicable."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"14. Release and Limitation of Liability"}</h2>
        <p className="mb-5">{"To the fullest extent permitted by applicable law, entrants agree to release and hold harmless Sponsor and its owners, officers, employees, contractors, agents, and representatives from claims arising directly from participation in the Giveaway or the acceptance, possession, use, or misuse of the prize, except to the extent liability cannot legally be waived."}</p>
        <p className="mb-5">{"Nothing in these Official Rules is intended to waive or limit liability that cannot lawfully be waived or limited."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"15. Facebook, Instagram and Meta Disclaimer"}</h2>
        <p className="mb-5">{"This Giveaway is "}<strong>{"not sponsored, endorsed, administered by, or associated with Facebook, Instagram, or Meta Platforms, Inc."}</strong></p>
        <p className="mb-5">{"By entering, each entrant acknowledges that the entrant is providing information to Krystal Clean Pool Service and not to Facebook, Instagram, or Meta Platforms, Inc."}</p>
        <p className="mb-5">{"Each entrant releases Facebook, Instagram, and Meta Platforms, Inc. from liability arising from or relating to the administration of this Giveaway to the fullest extent permitted by law."}</p>
        <p className="mb-5">{"Any questions, comments, or complaints regarding the Giveaway should be directed to Krystal Clean Pool Service and not to Facebook, Instagram, or Meta."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"16. Governing Law"}</h2>
        <p className="mb-5">{"The Giveaway and these Official Rules are governed by the laws of the "}<strong>{"State of Arizona"}</strong>{", without regard to conflict-of-law principles."}</p>
        <p className="mb-5">{"Any dispute relating to the Giveaway will be handled in an appropriate court with jurisdiction in Arizona, subject to applicable law."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"17. Winner Announcement"}</h2>
        <p className="mb-5">{"After the winner has been verified, Sponsor may publicly announce the winner’s "}<strong>{"first name, last initial, and city"}</strong>{" through Krystal Clean Pool Service’s website, social media accounts, email, or other promotional channels."}</p>
        <h2 className="mb-4 mt-10 text-xl font-bold md:text-2xl">{"18. Acceptance of Official Rules"}</h2>
        <p className="mb-5">{"By submitting an entry, entrant confirms that entrant has read, understands, and agrees to these Official Rules."}</p>
        <p className="mb-5"><strong>{"NO PURCHASE NECESSARY. PURCHASE WILL NOT INCREASE ODDS OF WINNING. VOID WHERE PROHIBITED."}</strong></p>
      </article>
      <nav aria-label="Giveaway links" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#dfcaa7] pt-6 text-sm">
        <Link className="underline" href="/giveaway">Return to the giveaway</Link>
        <Link className="underline" href="/privacy-policy">Privacy Policy</Link>
      </nav>
    </main>
  );
}
