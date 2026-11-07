# Examples of task contracts

These examples describe desired outcomes, not prescribed implementations.

## Regression: region completion

**Goal:** A player who finishes a region can advance to the next available region without a refresh.

**Constraints:** Existing saves continue to load; locked regions remain inaccessible; progress reconciliation remains deterministic.

**Evidence:** Regression reproduces before fix; completion CTA appears after final step; advance works; locked-region and legacy-save tests pass.

## Architecture: change an API response contract

**Goal:** Introduce a new response representation across service and client components.

**Constraints:** Define versioning and compatibility, document error semantics, identify all consumers and stored-state implications, plan migration and rollback.

**Evidence:** Contract tests, compatibility tests, integration checks, and documentation changes correspond to the agreed design.

## Refactor: shared persistence module

**Goal:** Consolidate duplicate persistence logic without changing existing saved-state behavior.

**Constraints:** Keep serialization, recovery, failure handling, and caller-visible API invariant.

**Evidence:** Characterization tests before/after, diff review, and targeted integration verification.
