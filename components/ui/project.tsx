"use client";

import Image, { StaticImageData } from "next/image";
import puzzl from "@public/puzzl-022b7bb6.jpeg";
import { ProjectDetails } from "./project-details";
import Link from "next/link";
import { Button } from "./button";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";

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

export const Project = ({ project }: { project: ProjectType }) => {
  const { name, abstract, description, stack, image, url } = project;

  const getDate = () => {
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return date;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={image}
        alt={name}
        className="max-w-lg w-full border rounded"
      />
      <p className="w-full text-md text-slate-400 font-light text-left">
        {abstract}
      </p>
      <div className="w-full flex gap-2 justify-start my-4">
        <ProjectDetails project={project} />
        {url !== null ? (
          <Button variant={"link"} asChild>
            <Link href={url} target={"_blank"} rel={"noreferrer"}>View</Link>
          </Button>
        ) : (
          <Button
            variant={"link"}
            onClick={() =>
              toast.warning("This project is still in development", {
                description: getDate(),
                action: {
                  label: "close",
                  onClick: () => toast.dismiss(),
                },
              })
            }
          >
            View
          </Button>
        )}
      </div>
      <Toaster />
    </div>
  );
};
