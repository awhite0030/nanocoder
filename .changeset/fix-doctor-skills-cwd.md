---
"@nanocollective/nanocoder": patch
---

Fix /doctor and /skills to use getProjectRoot() instead of process.cwd() to resolve paths correctly in project subdirectories.
