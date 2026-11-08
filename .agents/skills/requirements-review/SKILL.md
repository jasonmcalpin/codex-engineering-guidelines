---
name: requirements-review
description: Identify consequential omissions in substantial engineering requests before implementation, separating requirements essential to the intended outcome from justified improvements and optional ideas.
---

# Requirements review

Use for new capabilities, multi-component changes, unclear operational dependencies, or requests where satisfying the literal wording may not achieve the stated destination. Skip routine edits with well-defined contracts.

1. Establish the intended outcome, chosen destination, existing architecture, decisions, constraints, and authority. Read relevant project documentation and code when available. Do not replace the user's destination with an alternative.
2. Restate what is explicitly requested and what is already guaranteed by the system. Separate verified facts, assumptions, and unknowns; do not invent requirements.
3. Ask: **What necessary condition for achieving this outcome has not been requested?** Inspect interfaces and consumers, state and migrations, trust and authorization, configuration and deployment, runtime discovery, capacity, resource ownership and cleanup, failure and recovery paths, compatibility, and observable verification. Examine only categories relevant to the change.
4. Classify each consequential finding:
   - **Required:** Without it, the requested outcome or an existing invariant fails. Identify the concrete failure mode and owning component.
   - **Recommended:** Justified by long-term operability or maintainability, but not required for the stated outcome. Explain the tradeoff.
   - **Optional:** A possible enhancement outside the current goal; do not inflate scope.
5. For required omissions, propose the smallest coherent addition to the requirements, with dependency owner, contract/invariant, and acceptance evidence. Surface material decisions before implementation; ask only when an unresolved choice changes the result.
6. Hand off architectural alternatives to `architecture-review`, observable regressions to `regression-fix`, and implementation evidence to `change-verification`. This review identifies missing requirements; it is not an approval gate or permission to implement extra features.

Deliver a concise set of findings with classification, supporting evidence or uncertainty, consequences if omitted, and suggested acceptance criteria. Explicitly say when no material omissions were found. Avoid generic best-practice lists, speculative systems, and ceremonial process.
