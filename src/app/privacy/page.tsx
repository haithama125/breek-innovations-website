import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — Breek Innovations",
  description:
    "Privacy policy for Breek Innovations LLC — what we collect, how we use it, and your rights.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mb-10 font-mono text-sm text-[#6B776F]">
          Effective September 16, 2026
        </p>

        <div className="space-y-6 text-[16px] leading-[1.65] text-[#3C4A41]">
          <p>
            Breek Innovations LLC (&ldquo;Breek,&rdquo; &ldquo;we,&rdquo; or
            &ldquo;us&rdquo;) builds mobile apps, websites, and loyalty programs
            for restaurants and small businesses. This policy explains what
            information we collect when you visit breek-innovations.com, contact
            us, or respond to one of our ads, and how we use it.
          </p>

          <Section title="Information we collect">
            <p>We collect information in three ways.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Information you give us.</strong> When you fill out a
                form on our site or in one of our ads on Facebook or Instagram,
                request a consultation, or email us, we collect what you
                provide: typically your name, email address, phone number,
                business name, number of locations, and anything you write in a
                message.
              </li>
              <li>
                <strong>Information collected automatically.</strong> Our site
                uses cookies and similar tools, including the Meta Pixel and
                standard web analytics, that record things like the pages you
                view, your approximate location, your device and browser type,
                and how you arrived at our site.
              </li>
              <li>
                <strong>Information from Meta.</strong> If you submit a lead
                form on Facebook or Instagram, Meta sends us the details you
                entered. Meta&apos;s own handling of your data is governed by the
                Meta Privacy Policy.
              </li>
            </ul>
          </Section>

          <Section title="How we use it">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                To respond to your inquiry and schedule or conduct a
                consultation.
              </li>
              <li>
                To send you information about our services that you have asked
                for. You can opt out of any marketing email at any time using
                the unsubscribe link or by emailing us.
              </li>
              <li>
                To measure whether our advertising is working and to show
                relevant ads to people who have visited our site.
              </li>
              <li>To operate, secure, and improve our website.</li>
              <li>To meet legal and accounting obligations.</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </Section>

          <Section title="Who we share it with">
            <p>
              We share information only with service providers that help us run
              the business, such as email and calendar providers, our CRM, our
              website host, and advertising platforms like Meta. These providers
              may use your information only to perform services for us. We may
              also disclose information when required by law or to protect our
              rights.
            </p>
          </Section>

          <Section title="Cookies and advertising choices">
            <p>
              You can control cookies through your browser settings. To limit
              how Meta uses your activity for ads, adjust your Facebook ad
              preferences. Some browsers and devices also offer a &ldquo;Do Not
              Track&rdquo; or &ldquo;Limit Ad Tracking&rdquo; setting.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep lead and contact information for as long as we are in
              touch with you about our services, and for up to three years
              after our last contact unless you ask us to delete it sooner.
              Client records are kept as long as needed for our contract with
              you and for legal and tax purposes.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us to see, correct, or delete the personal
              information we hold about you, or to stop contacting you, by
              emailing{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
              respond within 30 days. Residents of Virginia, California, and
              other states with consumer privacy laws, and residents of the EU
              or UK, may have additional rights under those laws, and we will
              honor them.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use reasonable technical and organizational measures to protect
              your information, including encrypted connections and access
              controls. No method of transmission or storage is completely
              secure, so we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Our services are for businesses and we do not knowingly collect
              information from anyone under 18. If you believe a minor has
              provided us with personal information, please contact us and we
              will delete it.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we make material changes, we will update the date at the top
              of this page and, where appropriate, notify you by email.
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
