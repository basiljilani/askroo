/**
 * The four steps for the merchant — their fifteen minutes, not our ten
 * weeks. This is deliberately about setup, not the internal build phases.
 */

export type Step = {
  n: number;
  title: string;
  /** One-line summary. */
  summary: string;
  /** The fuller explanation. */
  detail: string;
  /** Small mono caption — a concrete number or reassurance. */
  caption: string;
};

export const steps: Step[] = [
  {
    n: 1,
    title: "Install",
    summary: "One click from the Shopify App Store.",
    detail:
      "AskRoo installs as a theme app extension, so no theme code is edited. Nothing breaks when you change themes, and there's nothing to paste into your storefront.",
    caption: "no theme code touched",
  },
  {
    n: 2,
    title: "Sync",
    summary: "Catalogue, policies and FAQs ingest automatically.",
    detail:
      "Your catalogue, returns policy and FAQs are read and indexed for retrieval. You don't upload anything — AskRoo reads what's already in your store.",
    caption: "~3 min for a typical store",
  },
  {
    n: 3,
    title: "Set the rules",
    summary: "Tone, banned topics, discount policy, when to escalate.",
    detail:
      "You decide how it sounds and where its limits are. Defaults are conservative — auto-approve returns is off until you turn it on — so nothing acts on your behalf before you've said it can.",
    caption: "conservative by default",
  },
  {
    n: 4,
    title: "Go live",
    summary: "The widget appears on your storefront.",
    detail:
      "Turn it on and watch the dashboard. Every answer is inspectable and every automated action is reversible, so going live is something you can watch, not a leap of faith.",
    caption: "every action reversible",
  },
];
