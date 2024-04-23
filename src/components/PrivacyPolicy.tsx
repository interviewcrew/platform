'use client';

import Image from "next/image";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-faqs.jpg";

const PrivacyPolicyText = `
**1. Business Description**

InterviewCrew, operated solely by its founder, provides a platform and services for conducting and managing job interviews. For more information on our services, please visit our website at [https://www.interviewcrew.io](https://www.interviewcrew.io).

**2. Website Ownership**

InterviewCrew is the owner and operator of this website. You can contact InterviewCrew by email at [interviewcrew.io@gmail.com](mailto:interviewcrew.io@gmail.com), or by mail at Mittlerer Hasenpfad 30, Frankfurt am Main, Fallah, Germany.

**3. Website Visits**

You can visit the InterviewCrew website without providing any personal information. We do track the domains from which people visit us to understand our traffic but do not collect personal information during this process.

**4. Website Transactions**

Sometimes, InterviewCrew requires personal information to process transactions or provide services. We collect necessary details such as names, mailing addresses, email addresses, and payment information. If you prefer not to have this information used for further contact, you can let us know, and we will respect your wishes.

**5. Applicability**

This Privacy Policy applies to all interactions with InterviewCrew's website and services, including but not limited to:
- Usage of our website
- Social media interactions
- Marketing campaigns
- Use of our services and products

InterviewCrew processes Personal Data solely as a controller. As such, we are responsible for complying with applicable regulations and laws concerning personal data.

**6. Personal Information That May Be Collected**

- **Identifying Information:** We collect details like names, postal and email addresses, and payment information when necessary to fulfill a service or transaction.
- **Service Quality Monitoring:** We may monitor calls or interactions for quality assurance, with your consent.
- **Information from Children:** We do not knowingly collect information from children under 16 without parental consent.
- **Lost or Stolen Information:** Please inform us immediately if your information is compromised.
- **User-Provided Information:** You may provide us additional information through various interactions with our website and services.

**7. Uses of the Information**

- **Service Provision:** Your information helps us provide and improve our services.
- **Marketing:** We may use your information for marketing purposes, with your consent.
- **Customer Support:** We use your information to respond to inquiries and support needs.

**8. Disclosure of Information**

- **Within Our Organization:** Information may be shared within InterviewCrew for operational purposes.
- **Legal Requirements:** We may disclose your information if required by law.

**9. Use of Tracking Technologies**

- **Cookies:** We use cookies to improve user experience. You can manage cookie settings in your browser.
- **Web Beacons:** Occasionally used to optimize our website service.

**10. Information Security**

We take measures to protect your personal information through technical and organizational security protocols.

**11. Changes to This Privacy Policy**

We may update this Privacy Policy periodically. We will notify you of significant changes through our website.

**12. Your Rights**

Under the GDPR, you have rights including access to your data, correction, deletion, and the right to object to data processing.

**13. Contact Information**

For any privacy-related questions or concerns, please contact us via email at [interviewcrew.io@gmail.com](mailto:interviewcrew.io@gmail.com).

**For Individuals Based in the EU**

We comply with GDPR requirements directly applicable to our processing of your personal data.

**Last Updated:** 23 April 2024
`;

export function PrivacyPolicy() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Privacy Policy
          </h2>
        </div>

        <MarkdownPreview
          className="mt-8"
          style={{
            backgroundColor: "transparent",
            color: "inherit",
          }}
          source={PrivacyPolicyText}
        />
      </Container>
    </section>
  );
}
