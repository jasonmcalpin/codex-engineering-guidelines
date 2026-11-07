---
name: refactoring
description: Deliberately restructure code while preserving observable behavior, APIs, persistence, and other declared invariants. Not for opportunistic cleanup during unrelated work.
---

# Refactoring
1. Define the structural goal and behavior-preservation contract.
2. Inspect callers, tests, external interfaces, data formats, and failure behavior.
3. Add characterization coverage where important behavior is not presently protected.
4. Select the simplest coherent structure aligned with existing architecture, not merely the shortest implementation.
5. Make mechanical changes distinguishable from semantic ones; plan transition stages when compatibility requires them.
6. Validate before/after behavior and inspect the diff for accidental changes.
7. Report what changed structurally, what remains invariant, and what could not be verified.

If behavior intentionally changes, call it a contract change rather than a pure refactor.
