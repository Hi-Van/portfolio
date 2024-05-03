"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";

export const Navigation = () => {
  const position = "z-20 fixed w-full top-4 left-1/2 -translate-x-1/2 ";
  const display =
    "flex justify-between items-center bg-card gap-8 px-4 max-w-[800px] h-10 border rounded-md font-medium text-xs shadow";
  const inlineFlex = "inline-flex justify-center items-center gap-8";

  return (
    <nav className={position + display}>
      <Link href="/">Vanouphon Sirisouk</Link>
      <div className={inlineFlex}>
        <Link
          href="/about"
          className="primary-foreground hover:text-custom-highlight"
        >
          About
        </Link>
        <Link
          href="/experience"
          className="primary-foreground hover:text-custom-highlight"
        >
          Experience
        </Link>
        <Button
          variant={"link"}
          className="primary-foreground hover:text-custom-highlight p-0 hover:no-underline text-xs"
          onClick={() => {
            toast("Coming Soon!", {
              description: format(new Date(), "PPPPp"),
              action: {
                label: "Close",
                onClick: () => {},
              },
            });
          }}
        >
          Featured Work
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};
