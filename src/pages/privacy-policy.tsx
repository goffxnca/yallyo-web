import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <Head>
        <title>
          Yallyo.com Privacy Policy | How We Protect Your Information
        </title>
        <meta
          name="description"
          content="Read the Yallyo.com Privacy Policy to understand how we collect, use, and safeguard your information when you access our services. Learn about our data security measures and how we ensure your privacy. Make informed decisions about sharing your personal data with us to enhance your experience on Yallyo.com."
        />
      </Head>
      <div className="mx-auto max-w-6xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-4">Last Updated: 2023-07-01</p>

        <div className="mt-10">
          <p>
            Welcome to Yallyo.com (the &quot;Website&quot;). We appreciate your
            trust in us and are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, and disclose your
            information when you access or use our services. It&apos;s important
            that you carefully read and understand this policy to make informed
            decisions about sharing your personal information with us. By
            accessing or using our services, you consent to the collection, use,
            and disclosure of your information as described in this Privacy
            Policy.
          </p>

          {/* Information We Collect */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Information We Collect
            </h2>

            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Personal Information:
                  </strong>
                  When you sign in to Yallyo.com using your Google account, we
                  collect your Google profile picture, first name, last name and
                  language preference. This information is used to personalize
                  your experience on our platform.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Usage Information:
                  </strong>
                  We may collect certain information when you use our services,
                  such as your IP address, device information, browser type, and
                  operating system. This information is used to improve the
                  performance and security of our Website.
                </span>
              </li>
            </ul>
          </div>

          {/* Use of Information */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Use of Information
            </h2>

            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Personalization:
                  </strong>
                  We use your Google profile picture, first name, last name and
                  language preference to personalize your experience on
                  Yallyo.com.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Communication:
                  </strong>
                  If you contact us via email or through our contact form, we
                  may store and process the information you provide to respond
                  to your inquiries and provide customer support.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Service Improvement:
                  </strong>
                  We may use aggregated and anonymized information for
                  analytical purposes to improve our services, enhance user
                  experience, and optimize our platform&apos;s performance.
                </span>
              </li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Third-Party Services
            </h2>

            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Google Analytics::
                  </strong>
                  We use Google Analytics to analyze user behavior and website
                  traffic. Google Analytics collects information such as your IP
                  address and device information. This data is used to
                  understand user preferences and optimize our services.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    Facebook Pixel:
                  </strong>
                  We have implemented Facebook Pixel on our Website to measure
                  the effectiveness of our advertising efforts, analyze user
                  behavior, and understand the actions taken by users on our
                  Website. This data helps us optimize our Facebook ads and
                  deliver more relevant content to our users.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    SendGrid:
                  </strong>
                  We use SendGrid as our email provider to send transactional
                  emails and notifications to users. Email addresses and
                  communication sent through our platform may be processed and
                  stored by SendGrid.
                </span>
              </li>

              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-accent1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900 mr-2">
                    LogRocket:
                  </strong>
                  We utilize LogRocket to enhance our website&apos;s performance
                  and provide better user experience. LogRocket may collect user
                  interaction data and application logs to identify and
                  troubleshoot issues for improvement.
                </span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Data Security
            </h2>
            <p className="mt-4">
              At Yallyo.com, the privacy and security of your information are of
              utmost importance to us. We have implemented appropriate measures
              to safeguard your data and prevent unauthorized access,
              disclosure, alteration, or destruction. However, it&apos;s
              important to note that no method of transmission over the internet
              or electronic storage is 100% secure. While we strive to protect
              your information, we cannot guarantee its absolute security.
            </p>
          </div>

          {/* Media Processing*/}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Media Processing
            </h2>
            <p className="mt-4">
              We want to assure you that we do not store any media, including
              audio, video, or screen recordings, or chat messages sent between
              participants in a room. Our platform does not provide a recording
              feature. However, please be aware that participants in the room
              may use external software or tools to capture screens or record
              videos of the entire browser window. We want to emphasize that we
              have no control over such actions taken by participants using
              external tools.
            </p>
          </div>

          {/* Responsibility for External Recordings*/}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Responsibility for External Recordings
            </h2>
            <p className="mt-4">
              It is essential to understand that any recordings made by
              participants using external tools are solely their responsibility.
              As the website operator, we do not have access to or control over
              these external recordings. The recording party is responsible for
              obtaining any necessary consents from all participants in the room
              before initiating any recording. Furthermore, any storage and
              processing of such external recordings must comply with applicable
              regulations, and it is the recording party&apos;s responsibility
              to ensure adherence to these requirements.
            </p>
          </div>

          {/* Updates to this Privacy Policy */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Updates to this Privacy Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. The most
              current version will be posted on our Website, and we will notify
              you of any significant changes.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions, concerns, or suggestions regarding this
              Privacy Policy or our practices, please contact us at
              contact@yallyo.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
