# Human-centered interface engineering

Design software for the people who must discover, understand, operate, debug, and maintain it. An interface can be machine-correct and still impose unnecessary cognitive load on humans. Apply these principles proportionally to developer workflows, CLI tools, project layouts, configuration, logs, documentation, and user-facing interactions. Preserve existing architectural and protocol contracts; usability is not a reason to weaken safety or create ambiguity.

## Build a coherent mental model

- Use clear, short, domain-consistent names for concepts, folders, commands, options, and outputs. One concept should not acquire competing names across interfaces.
- Structure repositories by cohesive responsibility, with predictable homes for code, tests, configuration, examples, and docs. Avoid both undifferentiated flat directories and gratuitously deep nesting.
- Prefer familiar ecosystem conventions and the project's established patterns to clever naming or one-off navigation schemes.
- Make the common path immediately discoverable; expose advanced details progressively, without hiding decisions that affect correctness, security, or cost.

## Make common workflows simple

- Optimize the normal operation for the fewest meaningful decisions and least repetitive typing. Prefer a concise command with safe, well-defined defaults to repeatedly requiring a long sequence of flags.
- Infer values from reliable project context when unambiguous; when not, ask for a deliberate choice or require an explicit argument. Never guess destructive targets or bypass approval.
- Support useful `--help`, examples, predictable subcommands, actionable errors, and exit codes. Where worthwhile, support shell completion, dry runs, or confirmation for risky operations.
- Put stable configuration in one discoverable, validated configuration boundary rather than forcing users to repeat it on every invocation. Show effective configuration and its source when it materially affects behavior.
- Ensure powerful automation remains inspectable and controllable: provide status, progress, cancellation or interruption where appropriate, results, and recovery instructions.

## Reduce friction during maintenance

- Make setup and everyday development reproducible with a documented entry point and memorable scripts. Avoid requiring maintainers to know incidental tool internals.
- Explain errors in terms of what failed, the relevant cause or missing prerequisite, and a concrete recovery action; retain technical diagnostics when needed.
- Present logs and diagnostics with concise summaries plus accessible detail. Avoid floods of unstructured output or unexplained identifiers.
- Keep documentation task-oriented: quick start and normal path first, then options, reference material, troubleshooting, and advanced flows.
- Avoid breaking familiar commands or layouts without considering compatibility, migration, aliases where justified, and clear deprecation guidance.

## Human workflow review

For substantial changes that affect human operation, trace a representative developer or user task end to end:

1. What must a person know, find, remember, type, configure, or decide to succeed?
2. Can they locate the right entry point and understand the available action without reading implementation?
3. Are names, defaults, folder locations, and command structure consistent with the existing mental model?
4. Can they recognize success, diagnose failure, recover safely, and inspect the operation's effects?
5. Does simplifying the workflow preserve explicit control over ambiguous, expensive, privileged, or destructive actions?

Address material friction within the change's scope. Verify representative examples and help output when executable; for usability judgment, distinguish documented design review from actual user testing. Do not add elaborate UI, aliases, wizards, or configuration for trivial tasks without demonstrated need.

## Relationship to other guidelines

[Standards-first interoperability](STANDARDS_FIRST_INTEROPERABILITY.md) governs protocol and ecosystem contracts between systems. Human-centered engineering governs the cognitive and operational contract with people. Both apply when humans and machines share an interface.
