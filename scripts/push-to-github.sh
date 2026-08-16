#!/usr/bin/env bash
set -euo pipefail
REPO_URL="${1:-https://github.com/irenejaramillo076-cpu/quality-hackathon-edumarket.git}"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git push -u origin main
git push -u origin war-room-fixes
