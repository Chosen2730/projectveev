import React from "react";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-2xl uppercase font-bold'>Privacy Policy</h1>
      <h2 className='text-base mt-5 my-3 font-bold'>
        COLLECTING PERSONAL INFORMATION
      </h2>
      <p className='text-sm text-justify'>
        This Privacy Policy describes how veevclothiers.com (the “Site” or “we”)
        collects, uses, and discloses your Personal Information when you visit
        or make a purchase from the Site. When you visit the Site, we collect
        certain information about your device, your interaction with the Site,
        and information necessary to process your purchases. We may also collect
        additional information if you contact us for customer support. In this
        Privacy Policy, we refer to any information that can uniquely identify
        an individual (including the information below) as “Personal
        Information”. See the list below for more information about what
        Personal Information we collect and why.
      </p>
      <div className='text-sm text-justify'>
        <h2 className='text-base mt-5 my-3 uppercase font-bold'>
          Device information
        </h2>
        <p className='my-2'>
          <strong>Examples of Personal Information collected: </strong> version
          of web browser, IP address, time zone, cookie information, what sites
          or products you view, search terms, and how you interact with the
          Site.
        </p>
        <p className='my-4'>
          <strong>Purpose of collection:</strong> to load the Site accurately
          for you, and to perform analytics on Site usage to optimize our Site.
        </p>
        <p className='my-4'>
          <strong>Source of collection:</strong> Collected automatically when
          you access our Site using cookies, log files, web beacons, tags, or
          pixels. Disclosure for a business purpose: shared with our processor
          Shopify.
        </p>
        <h2 className='text-base mt-5 my-3 uppercase font-bold'>Minors</h2>
        <p className='my-4'>
          The Site is not intended for individuals under the age of 13. We do
          not intentionally collect Personal Informationfrom children. If you
          are the parent or guardian and believe your child has provided us with
          Personal Information, please contact us at the address below to
          request deletion.
        </p>
        <h2 className='text-base mt-5 my-3 uppercase font-bold'>Cookies</h2>
        <p className='my-2'>
          A cookie is a small amount of information that’s downloaded to your
          computer or device when you visit our Site. We use a number of
          different cookies, including functional, performance, advertising, and
          social media or content cookies. Cookies make your browsing experience
          better by allowing the website to remember your actions and
          preferences (such as login and region selection). This means you don’t
          have to re-enter this information each time you return to the site or
          browse from one page to another. Cookies also provide information on
          how people use the website, for instance whether it’s their first time
          visiting or if they are a frequent visitor.
        </p>
        <h2 className='text-base my-3 uppercase font-bold'>CHANGES</h2>
        <p className='my-2'>
          We may update this Privacy Policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
