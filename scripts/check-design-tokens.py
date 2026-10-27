#!/usr/bin/env python3
"""Check that the role colors in DESIGN.md still match the CSS tokens.

The spec is role-based (primary, secondary, ...), the CSS is implementation
(--ink, --data, ...). This maps one to the other and fails on a mismatch.

    python3 scripts/check-design-tokens.py

The report carries its own copy of the tokens because it is a standalone
document, so both stylesheets are checked.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "DESIGN.md"
SHEETS = [ROOT / "assets" / "site.css", ROOT / "report.html"]

# DESIGN.md role -> CSS custom property
ROLES = {
    "primary": "--ink",
    "secondary": "--data",
    "tertiary": "--assume",
    "neutral": "--paper",
    "panel": "--panel",
    "body": "--body",
    "muted": "--muted",
    "badge": "--badge-bg",
}


def design_colors(text):
    block = text[text.index("colors:"):text.index("typography:")]
    return {m.group(1): m.group(2).upper() for m in re.finditer(r'^\s{2}([a-z-]+):\s*"(#[0-9A-Fa-f]{6})"', block, re.M)}


def css_root(text):
    start = text.index(":root{")
    block = text[start:text.index("}", start)]
    return {m.group(1): m.group(2).upper() for m in re.finditer(r'^\s*(--[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6});', block, re.M)}


def main():
    doc = design_colors(DESIGN.read_text())
    failures = 0
    for sheet in SHEETS:
        css = css_root(sheet.read_text())
        bad = []
        for role, prop in ROLES.items():
            want, got = doc.get(role), css.get(prop)
            if want is None or got is None or want != got:
                bad.append((role, prop, want, got))
        for role, prop, want, got in bad:
            print(f"MISMATCH {sheet.name:12} {role:10} {prop:10} DESIGN.md={want} css={got}")
        if bad:
            failures += len(bad)
        else:
            print(f"{sheet.name:12} {len(ROLES)} role colors match DESIGN.md")
    if failures:
        print(f"{failures} role(s) out of sync")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
