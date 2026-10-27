#!/usr/bin/env python3
"""Confirm every source artifact is named in the navigation/context files."""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
DOCS = [ROOT / "AGENTS.md", ROOT / "README.md", ROOT / "DESIGN.md", ROOT / "design-system" / "README.md"]
IGNORED_FILES = {".DS_Store"}
IGNORED_DIRS = {"__pycache__"}
EXEMPT = {"AGENTS.md"}  # the map itself
GROUPED_DIRS = {
    "assets/fonts": "assets/fonts/",
    "preview": "preview/",
}

text = "\n".join(p.read_text(encoding="utf-8") for p in DOCS if p.exists())


def covered_by(rel: str):
    if rel in text:
        return "exact path"
    name = Path(rel).name
    if name in text and rel not in EXEMPT:
        return "file name"
    for prefix, needle in GROUPED_DIRS.items():
        if rel.startswith(prefix + "/") and needle in text:
            return f"directory {needle}"
    return None


rows = []
uncovered = []
for path in sorted(ROOT.rglob("*")):
    if path.is_dir():
        continue
    rel = path.relative_to(ROOT).as_posix()
    if path.name in IGNORED_FILES:
        rows.append((rel, "ignored (OS file)"))
        continue
    if any(part in IGNORED_DIRS for part in path.relative_to(ROOT).parts[:-1]):
        rows.append((rel, "ignored (cache)"))
        continue
    if rel in EXEMPT:
        rows.append((rel, "navigation map (exempt)"))
        continue
    hit = covered_by(rel)
    rows.append((rel, hit or "NOT COVERED"))
    if not hit:
        uncovered.append(rel)

width = max(len(r[0]) for r in rows)
for rel, status in rows:
    print(f"{rel:<{width}}  {status}")

sources = [r for r in rows if not r[1].startswith(("ignored", "directory", "navigation"))]
grouped = [r for r in rows if r[1].startswith("directory")]
print(f"\n{len(sources)} named source artifacts, {len(grouped)} grouped (fonts, preview), "
      f"{len(uncovered)} uncovered")
sys.exit(1 if uncovered else 0)
