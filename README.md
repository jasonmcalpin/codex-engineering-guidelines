# Engineering Guidelines

Engineering defaults and reusable skills for long-lived production systems, readable by humans and usable by Codex, Claude Code, and other coding agents. Written from roughly 20 years of software engineering experience.

Inspired by [Karpathy-Inspired Claude Code Guidelines](https://github.com/multica-ai/andrej-karpathy-skills). This independent community project is not endorsed by OpenAI, Anthropic, or Andrej Karpathy.

## Principles

1. **Establish intent:** identify contracts, boundaries, assumptions, and architectural decisions before modifying a system.
2. **Preserve conceptual integrity:** choose the simplest maintainable architecture satisfying real requirements, and reassess its fitness when feature responsibilities expand.
3. **Control scope and dependencies:** avoid unrelated changes while updating every necessary consumer of a changed contract.
4. **Standards-first interoperability:** implement applicable protocol contracts and ecosystem conventions; verify that real consumers can discover, invoke, and interpret integrations.
5. **Human-centered interfaces:** keep workflows, commands, naming, and repository organization intuitive without sacrificing explicit control.
6. **Deliver verifiable outcomes:** state acceptance criteria, run relevant checks, and distinguish proven results from unverified claims.
7. **Design for adaptability:** isolate decisions that may change independently, keep boundaries replaceable when justified, and treat refactoring as normal engineering work.


These are instructions to the coding agent, not an enforcement mechanism.

## Repository layout

```text
AGENTS.md
.agents/skills/
  architecture-review/SKILL.md
  requirements-review/SKILL.md
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

See [installation instructions](docs/INSTALLATION.md) for Codex, Claude Code, and the recommended pinned-submodule integration. Shared guidance lives only in `AGENTS.md` and `.agents/skills/`; tool-specific files are discovery adapters.

## Choose a skill

| Workflow | When to use |
| --- | --- |
| `requirements-review` | A substantial request may omit requirements essential to its intended outcome |
| `architecture-review` | A design decision or change crosses architectural boundaries |
| `regression-fix` | Existing behavior regressed and needs diagnosis and recurrence protection |
| `change-verification` | A substantial change or PR needs contract and acceptance checks |
| `refactoring` | Review architectural fitness during substantial feature extensions, or perform standalone behavior-preserving restructuring |

Skills are optional, task-specific guidance. They do not replace project architecture, domain constraints, or human review.

## Design and provenance

See [human-centered interfaces](docs/HUMAN_CENTERED_INTERFACES.md), [standards-first interoperability](docs/STANDARDS_FIRST_INTEROPERABILITY.md), [MCP interface contracts](docs/MCP_INTERFACE_CONTRACTS.md), [adaptability and modularity](docs/ADAPTABILITY.md), [design rationale](docs/DESIGN.md), [task examples](docs/EXAMPLES.md), [requirements-review acceptance cases](docs/REQUIREMENTS_REVIEW_CASES.md), and [attribution](ATTRIBUTION.md).

Key departure from the original inspiration: this project explicitly prioritizes maintainable system architecture and dependency-aware contract changes over strictly minimizing changed lines or code size.

## Contributing

Changes should explain which coding-agent failure mode they address and how improvement could be observed in a representative task. Keep always-on instructions concise and skill descriptions narrowly scoped.

## License

Licensed under the [MIT License](LICENSE). You may use, modify, and redistribute the material under its terms.
