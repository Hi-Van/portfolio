"use client";

import { format } from "date-fns";
import { toast } from "sonner";

export const ClientClickHack = (): JSX.Element => {
  return (
    <li>
      <span
        className="primary-foreground hover:text-custom-highlight hover:cursor-pointer"
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
        I love building projects{" "}
      </span>
      to practice my design skills and learn new technologies
    </li>
  );
};
