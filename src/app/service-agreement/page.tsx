import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className='bg-white p-10 mt-10 flex flex-col items-center justify-center rounded-md shadow-md space-y-3'>
        <h1 className='text-2xl font-medium'>
          John&apos;s Krystal Clean Pool Service, Service Agreement
        </h1>
        <p>11676 E Sunflower Ln. Florence, AZ 85132</p>
        <h2 className='my-6 text-lg font-medium '>Service Agreement</h2>
        <p className='my-6'>
          The following information outlines the agreement between you, the
          customer, and us, the service provider. Take a moment to go over this
          agreement as it may answer questions and provide you with valuable
          information.
        </p>
        <ol className='flex flex-col space-y-4'>
          <li>
            <p>
              John&apos;s Krystal Clean Pool Service will mail/email you an
              invoice at the beginning of each month for the services provided
              during that month. All payments are due upon receipt. A late fee
              of $25.00 will be assessed for any late payments received after
              the last day of the month. Our regular services are performed from
              Monday to Sunday. If your scheduled service day falls on a major
              holiday, the service will be rescheduled to either the day before
              or the day after, depending on the holiday&apos;s day of the week.
              Our normal business hours are from 9:00 A.M. to 5:00 P.M., Monday
              through Friday. To cancel the service, a written or email notice
              of one-month prior is required.
            </p>
          </li>
          <li>
            <p>
              Due to environmental conditions such as lightning storms, heavy
              rains, high winds, or other acts of nature, providing full service
              on your designated service day may not always be possible.
              However, we will still check and adjust the chemicals and empty
              the baskets, regardless of the weather conditions.
            </p>
          </li>
          <li>
            <p>
              Our service technicians require weekly access to your
              pool/spa/fountain. This includes ensuring that gates are
              accessible and guard dogs are properly secured. Please provide us
              with the necessary key(s) and/or gate opener if applicable. No
              credit will be given if the pool/spa/fountain is inaccessible
              during the scheduled service. Our technicians will secure the
              gate(s) upon completion of the service.
            </p>
          </li>
          <li>
            <p>
              The weekly service fee covers a maximum of one hour of labor
              during each visit. In cases of high winds, monsoons, or other
              adverse conditions, it may take multiple visits to restore your
              pool/spa/fountain to its optimal condition. Commercial pools may
              require longer visits, typically lasting one and a half hours.
            </p>
          </li>
          <li>
            <p>
              John&apos;s Krystal Clean Pool Service utilizes a combination of
              liquid chlorine and chlorine tablets, either placed in a floater
              or an inline chlorine feeder. From March to October, chlorine
              tablets will be used, along with liquid chlorine if necessary.
              Commercial pools may have specific requirements that differ from
              residential pools.
            </p>
          </li>
          <li>
            <p>
              Since pools/spas/fountains are exposed to the elements and our
              service is not performed daily, various environmental conditions
              and factors may cause significant changes in water chemistry
              during the week. John&apos;s Krystal Clean Pool Service is not
              responsible for changes in water chemistry or problems caused by
              environmental factors.
            </p>
          </li>
          <li>
            <p>
              John&apos;s Krystal Clean Pool Service assumes no responsibility
              for faulty plaster or service conditions such as cracking,
              popping, staining, vinyl lining problems, or related equipment
              issues.
            </p>
          </li>
          <li>
            <p>
              John&apos;s Krystal Clean Pool Service is not liable for any
              existing equipment failures or problems with pumps, motors, or
              filters.
            </p>
          </li>
          <li>
            <p>
              The customer&apos;s responsible for maintaining a proper
              pool/spa/fountain water level. In most cases, the skimmer opening
              should be submerged halfway underwater. If you have an auto water
              leveler that functions correctly, maintaining the proper water
              level should not be a concern.
            </p>
          </li>
          <li>
            <p>
              On the day of service, please make sure that swimming pool toys,
              floating mats, and solar covers are removed. If you have a safety
              net, solar cover, or any other safety feature protecting your
              pool, it should be removed prior to our visit. We do not remove or
              install any nets, covers, or safety features. If the safety net is
              not removed, we will only balance the chemicals and empty the
              baskets.
            </p>
          </li>
          <li>
            <p>
              Non-automatic swimming pool covers must be removed on the day of
              service.
            </p>
          </li>
          <li>
            <p>
              Over time, certain swimming pool parts and items may wear out or
              break. To streamline the repair process, we offer the option of
              setting a predetermined dollar amount cap for fixing small items.
              Some examples of such items include rubber gaskets for the
              filter(s), leaf catcher baskets, pressure gauges, pool sweeper
              parts, skimmer weirs or skimmer lids, and floating chlorine
              dispensers.
            </p>
          </li>
          <li>
            <p>
              John&apos;s Krystal Clean Pool Service will be closed during
              specific periods, and no service will be provided. These periods
              include the week of Thanksgiving and the week of Christmas.
              Additional time off may be taken as needed, with coverage provided
              by another technician. Unless it is an emergency, you will receive
              advance notification of any additional closures. The monthly
              service fee already accounts for these closures, and no credit
              will be issued. In an emergency, we will make every effort to
              respond quickly to your calls and emails.
            </p>
          </li>
          <li>
            <p>
              Service days may occasionally change due to routing and scheduling
              adjustments. While we aim to maintain the initially provided
              service day, we cannot guarantee that it will never change. Any
              schedule changes will be communicated to you via email or in
              person during a service visit.
            </p>
          </li>
          <li>
            <p>
              All cartridge filters must be serviced at least twice a year,
              while D.E. filters require at least one annual service. Estimates
              for these services will be sent via email in advance of the
              cleaning. Once the estimate has been approved, the filter
              cleanings will be scheduled in the approval order. If estimates
              remain unapproved after one month, they will be sent again. If
              approval is still not received after the second estimate, the
              filters will be serviced regardless and billed in the next monthly
              service invoice. Regular filter servicing is necessary to maintain
              proper water chemistry and ensure system functionality. If you
              prefer to service your own filter, please inform us via email.
            </p>
          </li>
        </ol>
        <p>
          <strong>Agree to the service agreement</strong>
        </p>
        <p>
          Any disputes arising from this agreement or related services shall be
          handled in the state of Arizona through mediation.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
