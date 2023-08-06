import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";

const TermsOfService = () => {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <Head>
        <title>Yallyo.com Terms of Service | Access and Use Agreement</title>
        <meta
          name="description"
          content="Read the Yallyo.com Terms of Service carefully before using our platform. These terms govern your access and usage of the website. Understand your rights, responsibilities, and prohibited activities to ensure a smooth and enjoyable experience on Yallyo.com."
        />
      </Head>

      <div className="mx-auto max-w-6xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>

        <p className="mt-4">Last Updated: 2023-07-01</p>

        <div className="mt-10">
          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using Yallyo.com (referred to as the &quot;Website&quot;).
            These Terms govern your access to and use of the Website, and by
            accessing or using it, you agree to be bound by these Terms. They
            apply to all visitors, users, and others who access or use the
            Website.
          </p>

          <p>
            By accessing or using the Website, you indicate your acceptance of
            these Terms. If you do not agree with any part of the Terms, then
            you may not access or use the Website.
          </p>

          {/* Use of the Website */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Use of the Website
            </h2>

            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Eligibility:
                  </strong>
                  You must be at least 18 years old or the legal age of majority
                  in your jurisdiction to use the Website. By using the Website,
                  you represent and warrant that you meet these eligibility
                  requirements.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    User Account:
                  </strong>
                  In order to access certain features of the Website, you may be
                  required to create a user account. You are responsible for
                  maintaining the confidentiality of your account information
                  and are fully responsible for all activities that occur under
                  your account.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Prohibited Activities:
                  </strong>
                  You agree not to engage in any prohibited activities while
                  using the Website, including but not limited to:
                </span>
              </li>
            </ul>

            <ul className="list-disc ml-20">
              <li>Violating any applicable laws or regulations</li>
              <li>
                Interfering with or disrupting the security or integrity of the
                Website
              </li>
              <li>
                Engaging in any form of unauthorized access or data collection
              </li>
              <li>
                Uploading or transmitting malicious code, viruses, or any other
                harmful content
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Privacy
            </h2>
            <p className="mt-4">
              Your privacy is important to us. Please refer to our{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-accent1"
              >
                Privacy Policy
              </a>{" "}
              for information on how we collect, use, and disclose your personal
              information.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Intellectual Property
            </h2>
            <p className="mt-4">
              The Website and its original content, features, and functionality
              are owned by Yallyo.com and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property or proprietary rights laws. You may not modify,
              reproduce, distribute, or create derivative works based upon the
              Website or any part thereof.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              Yallyo.com, its directors, officers, employees, or agents shall
              not be liable for any damages arising from or related to your use
              of the Website, whether directly, indirectly, incidentally,
              specially, or as a result of any other circumstances. This
              includes damages caused by contracts, negligence, or any other
              legal basis.
            </p>
          </div>

          {/* Changes to the Terms */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Changes to the Terms
            </h2>
            <p className="mt-4">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. The most current version of the Terms
              will be posted on the Website. By continuing to access or use the
              Website after any revisions become effective, you agree to be
              bound by the updated Terms.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions or concerns regarding these Terms,
              please contact us at contact@yallyo.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
