"use client";
import React, { useEffect } from "react";
import cookie from 'js-cookie';
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("7174041372672275");
        const consent = cookie.get('cookieConsent');
        if (consent) {
          const preferences = JSON.parse(consent);
          if (preferences.functional) {
            ReactPixel.init("7174041372672275");
            }
        }
        ReactPixel.pageView();
        
      });
  }, [pathname, searchParams]);

  return null;
};
