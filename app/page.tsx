import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col w-full h-full max-w-[1400px] items-center text-sm">
        <h1 className="text-6xl font-semibold mb-2">
          <span className="text-custom-highlight">Van</span>ouphon{" "}
          <span className="text-custom-highlight">S</span>irisouk
          <span className="text-custom-highlight">.</span>
        </h1>
        <h2 className="text-base dark:text-muted-foreground mb-24">
          Human visualizing{" "}
          <code className="text-custom-highlight bg-custom-highlight/20 py-0.5 px-1 rounded">
            1&0
          </code>{" "}
          for other humans.
        </h2>

        <div className="flex justify-center gap-6 text-xs text-muted-foreground h-20">
          <p className="max-w-52">
            Software Engineer, I focus on improving data accessibility,
            transparency, and consumption for users.
          </p>
          <Separator orientation="vertical" className="light:bg-muted-foreground"/>
          <p className="max-w-52">
            Web design enthusiast, I enjoy creating beautiful and functional
            spaces.
          </p>
          <Separator orientation="vertical" className="light:bg-muted-foreground"/>
          <p className="max-w-52">
            Part-time nerd, currently diving into live-collaboration and
            multiplayer technology.
          </p>
        </div>
      </div>
    </main>
  );
}
