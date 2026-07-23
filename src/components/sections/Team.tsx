import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { cn } from "@/lib/utils";

type Member = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

const founder: Member = {
  name: "Basil Jilani",
  role: "Founder",
  initials: "BJ",
  bio: "Basil is doing his Business Analytics undergrad at Macquarie University and building AskRoo in the hours between lectures. He started it because he'd had enough of chatbots that answer confidently and get it wrong. Runs on flat whites and long arguments with Claude — he loses most of them, and the product is better for it.",
};

const team: Member[] = [
  {
    name: "Eo Jin “Ginny” Lee",
    role: "Legal Counsel",
    initials: "GL",
    bio: "Ginny is a solicitor and a Macquarie University alum who keeps AskRoo's returns language on the right side of Australian Consumer Law. Early in her career and sharp with it — she reads the fine print so your shoppers never have to.",
  },
  {
    name: "Emily Lee",
    role: "People & Culture",
    initials: "EL",
    bio: "Emily runs people and culture, which mostly means she's the reason the team actually likes each other. Owns a sweet tooth the size of Sydney and bakes for every occasion, plus a few she invents. If something needs sorting, she's usually sorted it already.",
  },
  {
    name: "Lachlan “Lachie” Dunne",
    role: "Engineering intern",
    initials: "LD",
    bio: "Lachie ships features between surf checks and swears the best ideas come from the water. The commit history is skeptical, but the ideas are good, so nobody argues.",
  },
  {
    name: "Angus Fletcher",
    role: "Engineering intern",
    initials: "AF",
    bio: "Angus debugs by staring at the problem until it feels awkward and confesses. Powered by meat pies and a level of confidence the code doesn't always earn — yet.",
  },
  {
    name: "Matilda “Tilly” Ryan",
    role: "Design intern",
    initials: "TR",
    bio: "Tilly can spot the pixel that's one off from across the room. Keeps a running list of small things that annoy her, which has quietly become our best backlog.",
  },
];

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-hairline bg-elev-1 font-mono text-sm text-accent-300",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function Team() {
  return (
    <Section id="team" className="border-t border-hairline">
      <Reveal>
        <SectionHeading
          eyebrow="The team"
          title="Who's actually building this."
          lede="A small crew in Sydney — one founder, a couple of grown-ups keeping us honest, and interns who are better than they let on."
        />
      </Reveal>

      {/* Founder — featured */}
      <Reveal className="mt-12">
        <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-start md:p-8">
          <Avatar initials={founder.initials} className="h-16 w-16 text-lg" />
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-medium text-bright">{founder.name}</h3>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
                {founder.role}
              </span>
            </div>
            <p className="mt-3 max-w-2xl leading-relaxed text-dim">
              {founder.bio}
            </p>
          </div>
        </div>
      </Reveal>

      {/* The rest */}
      <Stagger className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <StaggerItem key={member.name} index={i} className="h-full">
            <div className="panel flex h-full flex-col p-6">
              <Avatar initials={member.initials} className="h-12 w-12" />
              <h3 className="mt-4 text-base font-medium text-bright">
                {member.name}
              </h3>
              <span className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
                {member.role}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                {member.bio}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
