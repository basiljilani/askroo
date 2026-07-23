import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata = buildMetadata({
  title: "Terms of service",
  description:
    "The terms that govern a merchant's use of AskRoo during beta and beyond.",
  path: "/legal/terms",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        lede="The agreement between you and us when you use AskRoo on your Shopify store."
      />
      <Section>
        <Prose>
          <p className="text-sm text-faint">
            <em>
              Template — a working draft to review with legal counsel before
              launch. Last updated July 2026.
            </em>
          </p>

          <h2>Agreement</h2>
          <p>
            These terms are between you, the Shopify merchant who installs and
            uses {siteConfig.name} (&quot;you&quot;), and {siteConfig.legalName}{" "}
            (&quot;we&quot;, &quot;us&quot;). By installing or using{" "}
            {siteConfig.name}, you agree to these terms. If you are using{" "}
            {siteConfig.name} on behalf of a business, you confirm you are
            authorised to accept these terms for that business.
          </p>

          <h2>The service</h2>
          <p>
            {siteConfig.name} is an AI support agent for Shopify. It answers
            shopper questions from your live store data and shows the source
            behind each answer, and it includes a lightweight support inbox for
            your team. At launch, {siteConfig.name} supports web chat. Email, SMS
            and WhatsApp are on the roadmap and not yet available. Voice is not
            planned.
          </p>

          <h2>Beta status</h2>
          <p>
            {siteConfig.name} is provided as-is during beta. Features may change,
            and you should expect rough edges while we build. We may add, change
            or remove functionality as the product develops. We will try to give
            reasonable notice of significant changes.
          </p>

          <h2>Billing</h2>
          <p>
            Paid tiers are charged in US dollars (USD) through the Shopify
            Billing API and appear on your Shopify invoice. If you bring your own
            LLM key (BYOK), you pay your LLM provider directly for usage on that
            key, separately from any {siteConfig.name} charge. Taxes are handled
            according to Shopify&apos;s billing process.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to use {siteConfig.name} to:</p>
          <ul>
            <li>Break the law or help anyone else do so.</li>
            <li>
              Infringe the rights of others, including intellectual property and
              privacy rights.
            </li>
            <li>
              Attempt to access, extract or interfere with other merchants&apos;
              data or the security of the service.
            </li>
          </ul>

          <h2>What the agent will and won&apos;t do</h2>
          <p>
            {siteConfig.name} can initiate returns, but it never issues refunds
            or edits orders on its own. You set the guardrails that decide what
            the agent is allowed to do. Every automated action is logged and
            reversible, so you can review and undo what happened.
          </p>

          <h2>Your responsibilities</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>
              Keeping your catalogue, policies and store data accurate, since the
              agent answers from them.
            </li>
            <li>
              Configuring {siteConfig.name} appropriately, including guardrails
              and escalation rules.
            </li>
            <li>
              Meeting your own obligations to your customers, including under the
              Australian Consumer Law and any other consumer laws that apply to
              your store.
            </li>
          </ul>

          <h2>No warranty during beta</h2>
          <p>
            During beta, {siteConfig.name} is provided without warranties of any
            kind, to the extent permitted by law. We do not guarantee that the
            service will be uninterrupted, error-free, or that every answer will
            be correct. Nothing in these terms limits rights you have under laws
            that cannot be excluded, including the Australian Consumer Law.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for indirect or
            consequential loss, or for loss of profits, revenue or data, arising
            from your use of {siteConfig.name}. Where liability cannot be
            excluded but can be limited, our liability is limited to the amount
            you paid us for the service in the three months before the event
            giving rise to the claim.
          </p>

          <h2>Suspension and termination</h2>
          <p>
            You can stop using {siteConfig.name} at any time by uninstalling it
            from your Shopify store. We may suspend or end access if these terms
            are breached, if required for security, or if we stop offering the
            service. Where practical, we will give notice before doing so.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms as the product and the law change. When we
            make a material change, we will update the date at the top of this
            page and, where appropriate, let you know. Continuing to use{" "}
            {siteConfig.name} after a change means you accept the updated terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of New South Wales, Australia,
            and the courts of that state have jurisdiction over any dispute.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have a question about these terms, contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </Prose>
      </Section>
    </>
  );
}
