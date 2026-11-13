import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms and Conditions — Breek Innovations",
  description:
    "Terms and conditions for using the Breek Innovations LLC website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main className="mx-auto max-w-[820px] px-7 py-24">
        <div
          className="mb-2 font-mono text-[13px] text-[#2E6B47]"
          style={{ letterSpacing: "0.06em" }}
        >
          LEGAL
        </div>
        <h1
          className="mb-4 font-display font-bold"
          style={{
            fontSize: "clamp(34px, 4.2vw, 56px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
          }}
        >
          Terms and Conditions
        </h1>
        <p className="mb-10 font-mono text-sm text-[#6B776F]">
          Effective November 12, 2026
        </p>

        <div className="space-y-6 text-[16px] leading-[1.65] text-[#3C4A41]">
          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of
            breek-innovations.com and any consultations or services provided by
            Breek Innovations LLC (&ldquo;Breek,&rdquo; &ldquo;we,&rdquo; or
            &ldquo;us&rdquo;). By using our site, submitting a form, or booking
            a call with us, you agree to these Terms. If you do not agree,
            please do not use the site.
          </p>

          <Section title="Our services">
            <p>
              Breek builds mobile apps, websites, loyalty programs, and AI
              automations for restaurants and small businesses. Information on
              this site, including descriptions, examples, results, and
              pricing, is provided for general information and may change at
              any time. It is not an offer or a guarantee of specific results.
            </p>
          </Section>

          <Section title="Free consultations">
            <p>
              We may offer free consultations, such as a website review or an AI
              automation consultation. Consultations are offered without
              obligation, and any recommendations we make are general
              suggestions based on the information you share with us. You are
              responsible for deciding whether and how to act on them.
            </p>
          </Section>

          <Section title="Client projects">
            <p>
              Paid work is governed by a separate proposal, agreement, or
              statement of work signed by you and Breek. That agreement sets
              out the scope, timeline, fees, payment terms, and ownership of
              deliverables. If it conflicts with these Terms, the signed
              agreement controls.
            </p>
          </Section>

          <Section title="Using our website">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use the site for any unlawful or fraudulent purpose.</li>
              <li>
                Submit false information or information about another person
                without their permission.
              </li>
              <li>
                Attempt to disrupt, damage, or gain unauthorized access to the
                site or its systems.
              </li>
              <li>
                Copy, scrape, or reuse site content except as allowed by law.
              </li>
            </ul>
          </Section>

          <Section title="Text messages and calls">
            <p>
              If you give us your phone number through our site or one of our
              ads, you agree that we may call or text you about your inquiry
              and the services you asked about. Message frequency varies.
              Message and data rates may apply. Reply STOP to stop receiving
              text messages at any time, or HELP for help. Consent to receive
              messages is not a condition of any purchase. We do not share or
              sell mobile numbers or text messaging opt-in data with third
              parties for their marketing purposes.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              The content on this site, including text, graphics, logos, and
              design, belongs to Breek or its licensors and is protected by
              law. Client logos and project examples are shown with permission
              and remain the property of their owners. Ownership of work we
              create for clients is set out in each client agreement.
            </p>
          </Section>

          <Section title="Third-party services">
            <p>
              Our site and services may link to or rely on third-party
              platforms, such as Meta, Google, app stores, payment processors,
              and point-of-sale systems. We are not responsible for those
              services, and your use of them is governed by their own terms
              and policies.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              Our <a href="/privacy/">Privacy Policy</a> explains how we
              collect and use your information, and is part of these Terms.
            </p>
          </Section>

          <Section title="Disclaimers">
            <p>
              The site and any free consultations are provided &ldquo;as
              is&rdquo; and &ldquo;as available,&rdquo; without warranties of
              any kind, to the fullest extent allowed by law. We do not
              guarantee that the site will be uninterrupted or error-free, or
              that any particular business result will be achieved.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent allowed by law, Breek will not be liable
              for any indirect, incidental, special, or consequential damages,
              or for lost profits or revenue, arising from your use of the site
              or free consultations. Our total liability for any claim relating
              to the site will not exceed one hundred U.S. dollars ($100).
              Liability for paid services is governed by the client agreement.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These Terms are governed by the laws of the Commonwealth of
              Virginia, without regard to its conflict-of-law rules. Any
              dispute will be resolved in the state or federal courts located
              in Virginia.
            </p>
          </Section>

          <Section title="Changes to these Terms">
            <p>
              We may update these Terms from time to time. When we do, we will
              update the date at the top of this page. Continuing to use the
              site after a change means you accept the updated Terms.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              Breek Innovations LLC, Virginia, United States
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2
        className="font-display font-bold text-[#13201A]"
        style={{ fontSize: "24px", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
