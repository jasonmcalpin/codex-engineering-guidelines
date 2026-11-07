---
name: change-verification
description: Verify substantial code changes and pull requests against acceptance criteria, tests, contract impacts, and unintended diff scope before declaring work complete.
---

# Change verification
1. Read requirements, acceptance criteria, and the complete diff.
2. Check that changed files are justified by the goal or necessary dependencies.
3. Review public interfaces, persisted data, security boundaries, callers, docs, and backward compatibility.
4. Match each acceptance criterion to evidence: tests, build and lint checks, integration checks, or manual reproduction.
5. Run applicable checks and inspect the results. Classify failures as introduced, pre-existing, blocked, or unresolved with supporting evidence.
6. Report each material outcome as verified, not verified, or blocked, including exact commands and remaining risks.

Passing tests are evidence, not a universal correctness guarantee.
