import Link from "next/link";
import { fact } from "../../content/facts";
import type { RoleRow as Role } from "../../content/work";

function Systems({ systems }: { systems: NonNullable<Role["systems"]> }) {
  return (
    <ul className="mt-4 border-t border-line">
      {systems.map((system) => {
        const entry = fact(system.fact);
        return (
          <li
            key={system.name}
            className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2 border-b border-line py-3"
          >
            <div className="max-w-statement">
              <Link
                href={system.href}
                className="inline-flex min-h-11 items-center font-ui text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
              >
                {system.name}
              </Link>
              <p className="text-body-small text-body">{system.description}</p>
            </div>
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-heading-3 text-indigo">
                {entry.display}
              </span>
              <span className="font-ui text-caption text-muted">
                {system.unit}
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function RoleRow({ role }: { role: Role }) {
  return (
    <article id={role.anchor} className="grid scroll-mt-40 gap-4 py-8 md:grid-cols-3">
      <div>
        <p className="font-ui text-body-small font-semibold text-ink">
          {role.employer}
        </p>
        <p className="font-ui text-label text-muted">{role.period}</p>
        {role.place ? (
          <p className="font-ui text-label text-muted">{role.place}</p>
        ) : null}
      </div>
      <div className="md:col-span-2">
        <h2 className="font-display text-heading-3 tracking-heading-3 text-ink">
          {role.title}
        </h2>
        <p className="mt-2 max-w-measure text-reading text-body">
          {role.description}
        </p>
        {role.systems ? <Systems systems={role.systems} /> : null}
      </div>
    </article>
  );
}
