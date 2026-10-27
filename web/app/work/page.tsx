import { PageMain } from "../../components/shell/page-main";
import { RoleRow } from "../../components/work/role-row";
import { work } from "../../content/work";

export default function Work() {
  return (
    <PageMain className="mx-auto max-w-frame px-gutter py-block">
      <header>
        <h1 className="font-display text-display-page tracking-display text-ink">
          {work.heading}
        </h1>
        <p className="mt-6 max-w-statement text-reading text-body">{work.lede}</p>
      </header>

      <div className="mt-block border-t border-line">
        {work.roles.map((role) => (
          <RoleRow key={role.employer} role={role} />
        ))}
      </div>

      <p className="mt-block max-w-measure text-body-small text-muted">
        {work.note}
      </p>
    </PageMain>
  );
}
