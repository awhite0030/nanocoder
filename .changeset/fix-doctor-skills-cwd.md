---
"@nanocollective/nanocoder": patch
---

Fix /doctor and /skills commands to correctly resolve the project root when run from subdirectories by using getProjectRoot() instead of process.cwd().
