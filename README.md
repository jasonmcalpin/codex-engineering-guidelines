# Codex Engineering Guidelines

Codex-native behavioral guidance for engineers maintaining long-lived software systems.

Inspired by [Karpathy-Inspired Claude Code Guidelines](https://github.com/multica-ai/andrej-karpathy-skills), adapted for Codex's persistent `AGENTS.md` instructions and discoverable `SKILL.md` workflows. This is an independent community project, not an official OpenAI or Andrej Karpathy project.

## Principles

1. **Establish intent:** identify contracts, boundaries, assumptions, and architectural decisions before modifying a system.
2. **Preserve conceptual integrity:** choose the simplest maintainable architecture satisfying real requirements, not necessarily the fewest lines.
3. **Control scope and dependencies:** avoid unrelated changes while updating every necessary consumer of a changed contract.
4. **Deliver verifiable outcomes:** state acceptance criteria, run relevant checks, and distinguish proven results from unverified claims.

These are instructions to the coding agent, not an enforcement mechanism.

## Repository layout

```text
AGENTS.md
.agents/skills/
  architecture-review/SKILL.md
  regression-fix/SKILL.md
  change-verification/SKILL.md
  refactoring/SKILL.md
docs/
  INSTALLATION.md
  DESIGN.md
  EXAMPLES.md
ATTRIBUTION.md
```

## Install

**Per project:** merge [`AGENTS.md`](AGENTS.md) into your project's `AGENTS.md`. Copy relevant skill folders from [`.agents/skills/`](.agents/skills/) into your project's `.agents/skills/`.

**Across local projects:** merge the instructions into `~/.codex/AGENTS.md` and copy desired skill folders to `~/.agents/skills/`. Do not overwrite existing instructions without comparing them.

Read [installation instructions](docs/INSTALLATION.md) for Windows and Unix paths, validation, and precedence considerations.

## Choose a skill

| Workflow | When to use |
| --- | --- |
| `architecture-review` | A design decision or change crosses architectural boundaries |
| `regression-fix` | Existing behavior regressed and needs diagnosis and recurrence protection |
| `change-verification` | A substantial change or PR needs contract and acceptance checks |
| `refactoring` | Structure must change while observable behavior stays stable |

Skills are optional, task-specific guidance. They do not replace project architecture, domain constraints, or human review.

## Design and provenance

See [design rationale](docs/DESIGN.md), [task examples](docs/EXAMPLES.md), and [attribution](ATTRIBUTION.md).

Key departure from the original inspiration: this project explicitly prioritizes maintainable system architecture and dependency-aware contract changes over strictly minimizing changed lines or code size.

## Contributing

Changes should explain which coding-agent failure mode they address and how improvement could be observed in a representative task. Keep always-on instructions concise and skill descriptions narrowly scoped.

## License

Licensed under the [MIT License](LICENSE). You may use, modify, and redistribute the material under its terms.
