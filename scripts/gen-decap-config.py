#!/usr/bin/env python3
import re
import subprocess
import sys
from pathlib import Path

TEMPLATE = Path("public/admin/config.template.yml")
OUT = Path("public/admin/config.yml")


def sh(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, text=True).strip()


def parse_owner_repo(remote: str) -> str:
    remote = remote.strip()

    # git@github.com:owner/repo(.git)
    m = re.match(r"^git@github\.com:(?P<repo>.+?)(?:\.git)?$", remote)
    if m:
        return m.group("repo")

    # https://github.com/owner/repo(.git)
    m = re.match(r"^https?://github\.com/(?P<repo>.+?)(?:\.git)?$", remote)
    if m:
        return m.group("repo")

    raise ValueError(f"Unrecognized remote format: {remote}")


def main() -> int:
    try:
        remote = sh(["git", "config", "--get", "remote.origin.url"])
    except Exception:
        print("ERROR: Could not read git remote.origin.url", file=sys.stderr)
        return 1

    try:
        repo = parse_owner_repo(remote)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    if "/" not in repo:
        print(f"ERROR: Parsed repo is not owner/repo: {repo}", file=sys.stderr)
        return 1

    if not TEMPLATE.exists():
        print(f"ERROR: Missing template: {TEMPLATE}", file=sys.stderr)
        return 1

    text = TEMPLATE.read_text(encoding="utf-8")
    text = text.replace("__REPO__", repo)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text, encoding="utf-8")

    print(f"Generated {OUT} with repo={repo}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
