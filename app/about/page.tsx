import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function Home() {
  const goals = [
    { goal: "B.S. in Computer Science", achieved: true },
    { goal: "Move to New York City", achieved: false },
    { goal: "M.A. in Mathematics", achieved: false },
    { goal: "See the Aurora Borealis", achieved: false },
    { goal: "Visit London", achieved: false },
    { goal: "Visit Tokyo", achieved: false },
    { goal: "Visit Madrid", achieved: false },
    { goal: "Visit Hong Kong", achieved: false },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col w-full h-full max-w-[800px] items-center text-sm">
        <div className="flex w-full gap-8 mt-24">
          <div className="inline-flex flex-col w-96 gap-6">
            <div>
              <h1 className="text-2xl font-medium">Abstract</h1>
              <Separator className="mt-2 mb-4" />
              <p className="text-base indent-4 text-justify">
                I'm a software engineer who enjoys creating beautiful and
                functional spaces. I focus on improving data accessibility,
                transparency, and consumption for users. I am currently diving
                into live-collaboration and multiplayer technology.
              </p>
            </div>
            <div>
              <h1 className="text-2xl font-medium">
                Places to go, things to do...
              </h1>
              <Separator className="mt-2 mb-4" />
              <ScrollArea className="h-[160px] w-full bg-muted/20 rounded-md border p-4">
                <ul className="inline-flex flex-col w-full gap-2">
                  {goals.map((goal, index) => (
                    <>
                      <li
                        key={index}
                        className={`inline-flex items-center gap-2 ${
                          goal.achieved
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {goal.goal} {goal.achieved && <FaCheck className="" />}
                      </li>
                      {index !== goals.length - 1 && (
                        <Separator className="m-0" />
                      )}
                    </>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <div>
              <h1 className="text-2xl font-medium">Socials</h1>
              <Separator className="mt-2 mb-4" />
              <div className="inline-flex gap-4">
                <Button size={"icon"} asChild>
                  <Link
                    href="https://www.linkedin.com/in/van-s/"
                    rel="norefferer"
                    target="_blank"
                  >
                    <FaLinkedinIn className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size={"icon"} asChild>
                  <Link
                    href="https://github.com/Hi-Van"
                    rel="norefferer"
                    target="_blank"
                  >
                    <FaGithub className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl font-medium">Fun songs!</h1>
            <Separator className="mt-2 mb-4" />
            <div className="inline-flex w-full h-full flex-col gap-4">
              <iframe
                className="rounded-2xl overflow-hidden border shadow"
                src="https://open.spotify.com/embed/track/6ieWL5CLN9WdC875guWtMe?utm_source=generator"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
              <iframe
                className="rounded-2xl overflow-hidden border shadow"
                src="https://open.spotify.com/embed/track/6IpVkl7PFaCmv0g3MSRAVl?utm_source=generator"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
              <iframe
                className="rounded-2xl overflow-hidden border shadow"
                src="https://open.spotify.com/embed/track/17hEgChAl6FQ73xelHkKNt?utm_source=generator"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="my-6 w-full">
          <h1 className="text-2xl font-medium">Nerd facts & stuff</h1>
          <Separator className="mt-2 mb-4" />
          <ul className="inline-flex flex-col w-full gap-2 list-disc ml-4 text-base">
            <li>
              Although I'm a full-stack engineer, I mainly love react and
              frontend work
            </li>
            <li>
              My favorite game is Destiny, I've been playing since release in
              2014
            </li>
            <li>
              I'm very good at burning food in the kitchen{" "}
              <span className="text-muted-foreground italic">
                (I like to cook)
              </span>
            </li>
            <li>
              <Link
                href="/experience"
                className="primary-foreground hover:text-custom-highlight"
              >
                My experience
              </Link>{" "}
              includes{" "}
              <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light">
                3
              </span>{" "}
              internships and{" "}
              <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light">
                1
              </span>{" "}
              full-time position as a <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light">Software Engineer</span>
            </li>
            <li>
            <Link
                href="/projects"
                className="primary-foreground hover:text-custom-highlight"
              >
                I love building projects
              </Link> to practice my design skills and learn new technologies
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
