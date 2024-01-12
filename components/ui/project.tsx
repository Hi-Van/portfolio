import Image, { StaticImageData } from "next/image";
import puzzl from "@public/puzzl-022b7bb6.jpeg";
import { ProjectDetails } from "./project-details";

export type ProjectType = {
    name: string;
    abstract: string;
    description: string;
    stack: {
        frontend?: string[];
        backend?: string[];
    };
    image: string | StaticImageData;
    url: string | null;
};

export const Project = ({ project }: { project?: ProjectType }) => {
    const placeHolder: ProjectType = {
        name: "Puzzl",
        abstract: "Drag-and-drop editor with multiplayer support",
        description:
          "Puzzl is a drag-and-drop editor that enables programmers to create complex algorithms using logical steps and pseudocode. Puzzl facilitates real-time collaboration among teams, making it easy to work together and share ideas. Whether you're working on a group project or need to organize your thoughts, Puzzl is the perfect solution.",
        stack: {
          frontend: ["ReactJS", "Chakra UI", "TipTap"],
          backend: ["Firebase", "Stripe API"],
        },
        image: puzzl,
        url: null,
      };
    
    const { name, abstract, description, stack, image, url } = placeHolder;

    return (
        <div>
            <ProjectDetails project={placeHolder} />
        </div>
    );
};