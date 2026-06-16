from __future__ import annotations

import json
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
DATA_FILE = ROOT / "data" / "sample-news.json"
OUTPUT_FILE = ROOT / "digest.md"


def load_items() -> list[dict[str, str]]:
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def group_by_category(items: list[dict[str, str]]) -> dict[str, list[dict[str, str]]]:
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for item in items:
        grouped[item["category"]].append(item)
    return dict(sorted(grouped.items()))


def build_digest(items: list[dict[str, str]]) -> str:
    grouped = group_by_category(items)
    lines = [
        "# AI Daily Digest",
        "",
        f"Generated on {date.today().isoformat()}.",
        "",
        "> A beginner-friendly digest for AI, programming, and computer science learning.",
        "",
        "## Today's Highlights",
        "",
    ]

    high_impact = [item for item in items if item.get("impact") == "High"]
    for item in high_impact[:3]:
        lines.extend([
            f"- **{item['title']}** — {item['summary']}",
        ])

    for category, category_items in grouped.items():
        lines.extend(["", f"## {category}", ""])
        for item in category_items:
            lines.extend([
                f"### {item['title']}",
                "",
                f"- Source: {item['source']}",
                f"- Date: {item['date']}",
                f"- Impact: {item['impact']}",
                f"- Link: {item['url']}",
                "",
                item["summary"],
                "",
            ])

    lines.extend([
        "## Learning Prompt",
        "",
        "Pick one story, write three new words you learned, then explain the idea in your own words.",
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    items = load_items()
    digest = build_digest(items)
    OUTPUT_FILE.write_text(digest, encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
