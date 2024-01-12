import { Project, ProjectType } from "@/components/ui/project";
import { ProjectDetails } from "@/components/ui/project-details";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Puzzl from "@public/puzzl-022b7bb6.jpeg";
import Preeepare from "@public/preeepare-98c3a41a.jpeg";

export default function Home() {
  const puzzl: ProjectType = {
    name: "Puzzl",
    abstract: "Drag-and-drop editor with multiplayer support",
    description:
      "Puzzl is a drag-and-drop editor that enables programmers to create complex algorithms using logical steps and pseudocode. Puzzl facilitates real-time collaboration among teams, making it easy to work together and share ideas. Whether you're working on a group project or need to organize your thoughts, Puzzl is the perfect solution.",
    stack: {
      frontend: ["ReactJS", "Chakra UI", "TipTap"],
      backend: ["Firebase", "Stripe API"],
    },
    image: Puzzl,
    url: null,
  };

  const preeepare: ProjectType = {
    name: "Preeepare",
    abstract: "Visual charts for your studies",
    description:
      "Preeepare is a solution for students who want to excel in their studies. It uses visual charts to help track progress in different areas of study and identify areas that need more attention. This helps promote knowledge diversity and encourages topic depth by visualizing progress. With Preeepare, students can confidently take control of their learning journey and visualize their path to success.",
    stack: {
      frontend: ["ReactJS", "Chakra UI", "TipTap"],
      backend: ["Firebase", "Stripe API"],
    },
    image: Preeepare,
    url: "https://hi-van.github.io/preeepare/",
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full h-min rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <Project project={puzzl}/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
              <Project project={preeepare}/>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">More Projects to come!</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
