---
name: change-verification
description: Verify substantial changes and pull requests against acceptance criteria, contracts, failure paths, and actual evidence before declaring work complete.
---

# Change verification

1. Read requirements, acceptance criteria, existing architectural constraints, and the complete diff. Check that every changed file serves the goal or a necessary dependency.
2. Map affected contracts: public interfaces, persistence and transaction semantics, callers, security/trust boundaries, migrations, error behavior, and documentation. Identify assumptions delegated to interfaces or adapters; do not mistake a current implementation property for an explicit contract.
3. Map each acceptance criterion and claimed guarantee to concrete evidence. For regressions, confirm a test would have failed on the original implementation (run it against the old behavior when practical, or explain the failure sentinel and causal path).
4. When a change claims atomicity, durability, consistency, or retry safety across an I/O boundary, examine both success and failure outcomes. Verify rejected writes, partial/ambiguous commits, publication ordering, cleanup, and retry/idempotency behavior as applicable. If a required guarantee depends on an undocumented external contract, flag it rather than claiming end-to-end proof.
5. For persisted-state changes, distinguish same-instance object/repository reads from fresh-process or fresh-store hydration. Validate serialization, loading, schema checks, migrations, and reconciliation with a fresh instance when practical; otherwise mark reload compatibility unverified.
6. Run available relevant tests, typechecks, builds, and integration checks; inspect their actual outputs. Classify failures as introduced, pre-existing, blocked, or unresolved with evidence. Do not describe passing assertions as a fully green suite when the command failed.
7. Report each material claim as **verified**, **not verified**, or **blocked**, with commands, affected file references, and residual risks. Separate observed defects from missing coverage and future architectural risks. Avoid unnecessary new tests when the claim is already adequately covered.

Apply risk-proportionate depth: the extra I/O and reload checks matter when those guarantees are part of the change, not for every routine UI edit. Passing tests provide evidence, not universal proof.
