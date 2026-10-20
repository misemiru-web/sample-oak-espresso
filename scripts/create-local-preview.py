#!/usr/bin/env python3
"""Copy the production LP into local-preview/ for file:// viewing.

Run with Python 3; no dependencies or server required. Only generated preview
files are overwritten. Production files and deployment settings are untouched.
"""

from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "local-preview"
PAGE_FILES = ("index.html", "styles.css", "script.js")


def relative_images(text):
    # Covers quoted HTML/JS URLs, srcset candidates and CSS url(...), while
    # leaving full external URLs such as https://example.com/images/... alone.
    return re.sub(r"(?<![A-Za-z0-9_.:/-])/images/", "./images/", text)


def main():
    required = [ROOT / name for name in PAGE_FILES]
    required += [ROOT / "images", ROOT / "THIRD_PARTY_NOTICES.md"]
    for source in required:
        if not source.exists():
            raise SystemExit("Missing production input: " + str(source))

    OUTPUT.mkdir(exist_ok=True)
    for name in PAGE_FILES:
        text = (ROOT / name).read_text(encoding="utf-8")
        (OUTPUT / name).write_text(relative_images(text), encoding="utf-8")

    shutil.copytree(
        ROOT / "images",
        OUTPUT / "images",
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns(".DS_Store"),
    )
    shutil.copy2(ROOT / "THIRD_PARTY_NOTICES.md", OUTPUT / "THIRD_PARTY_NOTICES.md")
    print("Local preview ready: " + str(OUTPUT / "index.html"))


if __name__ == "__main__":
    main()
