import { ThemeToggle } from "../components/theme/theme-toggle";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-frame flex-col gap-block px-gutter py-section">
      <div className="flex items-center justify-between">
        <p className="font-ui text-caps tracking-caps text-muted uppercase">
          Van Sirisouk
        </p>
        <ThemeToggle />
      </div>
      <h1 className="font-display text-display-home tracking-display text-ink">
        Numbers, and how they were produced.
      </h1>
      <p className="max-w-measure text-reading text-body">
        The site is being rebuilt. This surface exists to hold the frame, the
        type scale, and the theme while the rest arrives.
      </p>
    </main>
  );
}
