import ContactSection from '@/components/ContactSection';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import GoogleCaptchaWrapper from '../google-captcha-wrapper';

const Page = () => {
  return (
    <GoogleCaptchaWrapper>
      <MaxWidthWrapper>
        <ContactSection />
      </MaxWidthWrapper>
    </GoogleCaptchaWrapper>
  );
};

export default Page;
