---
"@nanocollective/nanocoder": patch
---

Fixed an issue where `/doctor` and `/skills check` commands used `process.cwd()` instead of `getProjectRoot()`, which caused failures when executing these commands from a subdirectory.
