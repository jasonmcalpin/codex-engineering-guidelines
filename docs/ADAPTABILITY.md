# Adaptability through modularity

## Why this matters

Twenty years of building software in advertising taught me that the destination can change after implementation is already underway. A project planned around idea A may become idea B, then idea C. The costliest response is not rewriting a component; it is discovering that changing one decision forces a rewrite of the entire system.

I want software that can adapt when our understanding improves. Working implementations are valuable evidence, not permanent commitments. Build complete systems, learn from their real constraints, and refactor or replace components when a better architecture becomes clear.

## Design commitments

- **Separate decisions that can change independently.** Give capabilities cohesive ownership, explicit interfaces, and controlled dependencies. Modularity is measured by change isolation, not package count.
- **Bind through contracts, not internals.** Consumers must not depend on private state, incidental file layouts, or implementation details of another subsystem. Make ownership and failure semantics explicit.
- **Keep mechanisms replaceable where change pressure is real.** A transport, registry, persistence implementation, model adapter, or agent runner should be replaceable without requiring unrelated domain logic to change, when those are genuinely independent concerns.
- **Keep variable specifications in data.** Model-specific settings, tool formats, prompts, catalogs, and similar structured variation belong in declarative, validated artifacts when possible. Avoid repeated engine edits for new variants.
- **Refactor without stigma.** Rewrites and structural changes are reasonable when experience reveals a better boundary. Characterize existing behavior, name intentional contract changes, and migrate consumers deliberately.
- **Resist abstraction for its own sake.** Do not build plugin frameworks, extension points, adapters, or configuration surfaces for hypothetical alternatives. Introduce them when concrete variation or coupling justifies the maintenance cost.
- **Protect external commitments more than internal shape.** Public interfaces, persisted schemas, and integration protocols require versioning and compatibility planning; private modules may evolve more freely.

## Review questions

Before implementing or extending a substantial feature, ask:

1. What decision is likely to change, and which other decisions must remain unaffected?
2. Who owns this behavior and data? Do dependencies point toward stable contracts?
3. Would adding a new variant require editing a central engine or only supplying a new implementation or declarative specification?
4. Can this subsystem be tested and replaced independently? What observable contracts must be preserved?
5. Is a proposed boundary justified by demonstrated change pressure, or is it speculative infrastructure?

Apply these questions proportionally to the work. An isolated change should stay isolated; a genuine new responsibility should not be bolted onto the wrong subsystem.

## Examples of architectural evolution

- **Browser Model Lab:** Moving model-specific details into external cards prevents the benchmark engine from accumulating special cases; plugin boundaries allow model execution implementations to evolve independently.
- **Taro, Pantheon, and Aether:** Knowledge and intent, orchestration, and agent execution have distinct goals and lifecycles. Separating those responsibilities prevents one controller from owning every concern.
- **ArcanAI:** Plugin contracts and host adapters should not assume a single runner or orchestration system; the plugin system can evolve independently of its consumers.

These are illustrations of the decision-making philosophy, not mandatory frameworks or dependencies for other repositories.
