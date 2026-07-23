import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata = buildMetadata({
  title: "Privacy",
  description:
    "How AskRoo collects, uses and protects data for Shopify merchants and their shoppers.",
  path: "/legal/privacy",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="How we handle the data that flows through AskRoo, and the choices you and your shoppers have."
      />
      <Section>
        <Prose>
          <p className="text-sm text-faint">
            <em>
              Template — a working draft to review with legal counsel before
              launch. Last updated July 2026.
            </em>
          </p>

          <p>
            This policy explains how {siteConfig.name} ({siteConfig.legalName})
            handles personal information. It covers two groups: Shopify
            merchants who install {siteConfig.name}, and the shoppers who talk to
            it on a merchant&apos;s store. For a merchant&apos;s store, the
            merchant is the data controller and {siteConfig.name} is a processor
            acting on the merchant&apos;s instructions.
          </p>

          <h2>Who this covers</h2>
          <p>
            It applies whenever a merchant connects a Shopify store to{" "}
            {siteConfig.name}, and whenever a shopper interacts with the{" "}
            {siteConfig.name} widget on that store. Shoppers do not have a direct
            account with us. Their questions are answered on behalf of the
            merchant whose store they are visiting.
          </p>

          <h2>What we collect</h2>
          <p>We collect only what is needed to answer support questions:</p>
          <ul>
            <li>
              Shopper chat messages and the conversation history for a given
              support thread.
            </li>
            <li>
              Order, fulfilment and contact context needed to answer a question,
              read from the merchant&apos;s Shopify store at the time it is
              asked.
            </li>
            <li>
              The merchant&apos;s account details and the configuration they set
              up, including guardrails, policies and connected channels.
            </li>
            <li>
              The minimal Shopify permissions (scopes) required to do the job,
              and nothing broader.
            </li>
          </ul>

          <h2>Protected customer data</h2>
          <p>
            {siteConfig.name} requests the minimum Shopify scopes required to
            answer support questions and has completed Shopify&apos;s Level 2
            protected customer data access requirements. We treat customer
            personal information as protected data and limit who and what can
            reach it.
          </p>

          <h2>How we use data</h2>
          <p>We use the data we hold to:</p>
          <ul>
            <li>
              Answer support questions grounded in the merchant&apos;s live
              store data, and show the source behind an answer.
            </li>
            <li>
              Route escalations to the right person when a question needs a
              human.
            </li>
            <li>
              Monitor and improve the reliability and accuracy of the service.
            </li>
          </ul>
          <p>
            We do not sell personal information. We do not use shopper or
            merchant data to train third-party foundation models.
          </p>

          <h2>Retention</h2>
          <p>
            Personally identifiable information (PII) is retained for 90 days by
            default, after which it is deleted or de-identified. A merchant may
            ask us to remove specific data sooner. Aggregated, de-identified
            operational data may be kept longer to measure reliability.
          </p>

          <h2>Where data is held</h2>
          <p>
            {siteConfig.name} is hosted in an Australian region. Some
            sub-processors may process limited data elsewhere to deliver their
            part of the service; where that happens we put appropriate
            safeguards in place.
          </p>

          <h2>Legal framework</h2>
          <p>
            For Australian merchants, our handling of personal information is
            aligned to the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs). For merchants who serve customers in the EU or
            EEA, we are designed to support their obligations under the General
            Data Protection Regulation (GDPR), with the merchant acting as
            controller and {siteConfig.name} as processor.
          </p>

          <h2>Sub-processors</h2>
          <p>
            We use a small set of sub-processors to run the service. We keep
            these to what is necessary:
          </p>
          <ul>
            <li>
              <strong>LLM providers</strong> — used to generate answers. Where a
              merchant brings their own key (BYOK), that key is encrypted at
              rest, validated before use and never logged. The merchant&apos;s
              content is not used to train the provider&apos;s models.
            </li>
            <li>
              <strong>Cloud hosting</strong> — infrastructure that runs the
              application and stores data, in an Australian region.
            </li>
            <li>
              <strong>Transactional email</strong> — to send account and support
              notifications.
            </li>
          </ul>
          <p>
            Sub-processors are bound by contract to protect the data they handle
            and to use it only to provide their service to us.
          </p>

          <h2>Security</h2>
          <p>
            We design {siteConfig.name} to protect data in practical ways:
            encryption in transit and at rest, access controls that limit who
            and what can reach customer data, and logging of the actions the
            agent takes. Security is a commitment we build into the product, not
            a claim of perfect protection.
          </p>

          <h2>Cookies</h2>
          <p>
            We keep cookies to a minimum. The {siteConfig.name} widget uses only
            what is needed to run a support conversation, such as keeping a
            session going. We do not use it for advertising.
          </p>

          <h2>Your rights and choices</h2>
          <p>
            You can ask to access, correct or delete personal information, and
            you can make a complaint about how we handle it. Merchants can raise
            a request at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            . If you are a shopper, please contact the merchant whose store you
            were on first, as they are the data controller for their store. We
            will support the merchant in responding to your request.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as the product develops or the law
            changes. When we make a material change, we will update the date at
            the top of this page and, where appropriate, let merchants know.
          </p>

          <h2>Contact us</h2>
          <p>
            For any privacy question or request, contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            . Our postal contact is {siteConfig.contact.address}.
          </p>
        </Prose>
      </Section>
    </>
  );
}
