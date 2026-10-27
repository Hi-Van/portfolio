import { PageMain } from "../components/shell/page-main";

export default function Home() {
  return (
    <PageMain className="mx-auto flex min-h-dvh max-w-frame flex-col gap-block px-gutter py-section">
      <p className="font-ui text-caps tracking-caps text-muted uppercase">
        Van Sirisouk
      </p>
      <h1 className="font-display text-display-home tracking-display text-ink">
        Numbers, and how they were produced.
      </h1>
      <p className="max-w-measure text-reading text-body">
        The site is being rebuilt. This surface exists to hold the frame, the
        type scale, and the theme while the rest arrives.
      </p>
    </PageMain>
  );
}
