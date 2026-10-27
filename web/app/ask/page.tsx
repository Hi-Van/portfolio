import { AgentRoom } from "../../components/agent/agent-room";
import { PageMain } from "../../components/shell/page-main";

export const metadata = {
  title: "Ask · Van Sirisouk",
  description:
    "An agent that answers from this site and cites the page each answer came from.",
};

export default function Ask() {
  return (
    <PageMain className="mx-auto max-w-chat px-gutter py-block">
      <header className="mb-6">
        <h1 className="font-display text-display-page tracking-display text-ink">
          Ask
        </h1>
        <p className="mt-4 max-w-measure text-reading text-body">
          Ask about the work, the numbers, or the method. Answers come from this
          site, and each one names where it came from.
        </p>
      </header>
      <AgentRoom />
    </PageMain>
  );
}
