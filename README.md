# Codex Engineering Guidelines

Codex-native behavioral guidance for engineers maintaining long-lived software systems.

Inspired by [Karpathy-Inspired Claude Code Guidelines](https://github.com/multica-ai/andrej-karpathy-skills), adapted for Codex's persistent `AGENTS.md` instructions and discoverable `SKILL.md` workflows. This is an independent community project, not an official OpenAI or Andrej Karpathy project.

## Principles

1. **Establish intent:** identify contracts, boundaries, assumptions, and architectural decisions before modifying a system.
2. **Preserve conceptual integrity:** choose the simplest maintainable architecture satisfying real requirements, and reassess its fitness when feature responsibilities expand.
3. **Control scope and dependencies:** avoid unrelated changes while updating every necessary consumer of a changed contract.
4. **Deliver verifiable outcomes:** state acceptance criteria, run relevant checks, and distinguish proven results from unverified claims.
5. **Design for adaptability:** isolate decisions that may change independently, keep boundaries replaceable when justified, and treat refactoring as normal engineering work.


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

**Per project:** merge [`AGENTS.md`](AGENTS.md) into your project's `AGENTS.md`. Copy relevant skill folders from [`.agents/skills/`](.agents/skills/) into your project's `.agents/skills/`.

**Across local projects:** merge the instructions into `~/.codex/AGENTS.md` and copy desired skill folders to `~/.agents/skills/`. Do not overwrite existing instructions without comparing them.

Read [installation instructions](docs/INSTALLATION.md) for Windows and Unix paths, validation, and precedence considerations.

## Adopt or refresh skills in another repository

**For Codex and other coding agents:** This is the authoritative source of the reusable skills. When asked to add Codex skills to a project, follow this section directly; do not search other consumer repositories to reconstruct the procedure.

1. Inspect the destination repository's existing `AGENTS.md`, `.agents/skills/`, and any local update scripts before making changes. Preserve project-specific authority, custom skills, and unrelated files.
2. Copy the five shared skill directories into `.agents/skills/` in the destination. Keep their upstream `SKILL.md` files intact. Never replace a project's root `AGENTS.md` wholesale; create it if missing, or merge relevant shared expectations into its local contracts.
3. Include a documented update workflow so subsequent refreshes come **from this repository** rather than from another project. Prefer pinning and recording the upstream commit when reproducibility matters.
4. Inspect the resulting diff, validate skill discovery and project guidance, and deliver changes in a reviewable PR. Do not claim validation unless it was actually performed.

### Copy or update the shared skills

From the **destination repository root** on macOS/Linux (requires `git` and a POSIX shell):

```sh
tmp=$(mktemp -d)
git clone --quiet --depth 1 https://github.com/jasonmcalpin/codex-engineering-guidelines.git "$tmp/guidelines"
for skill in requirements-review architecture-review regression-fix change-verification refactoring; do
  test -f "$tmp/guidelines/.agents/skills/$skill/SKILL.md" || { echo "Missing $skill" >&2; rm -rf "$tmp"; exit 1; }
done
mkdir -p .agents/skills
for skill in requirements-review architecture-review regression-fix change-verification refactoring; do
  rm -rf ".agents/skills/$skill"
  cp -R "$tmp/guidelines/.agents/skills/$skill" ".agents/skills/$skill"
done
git -C "$tmp/guidelines" rev-parse HEAD
rm -rf "$tmp"
git diff -- .agents/skills
```

Run this inside a Git repository; when files are first added and untracked, also use `git status --short` to see them. The command refreshes **only** the five named shared skills. Review any local modifications in those skill directories before running it, as those directories are replaced. It does not modify root `AGENTS.md` or unrelated local skill directories.

For a permanent project command, commit a refresh script such as [ArcanAI's update script](https://github.com/jasonmcalpin/ArcanAI/blob/51dd5c51bef8e8b50609858eafcdb6855b06e110/scripts/update-codex-skills.sh) or adapt the commands above into the destination's existing tooling. The link is an implementation example, **not** an authority for the skill contents; this repository remains the source. Document the refresh command in the destination README or engineering-guidance documentation.

### Root instructions and precedence

The destination's `AGENTS.md` should state its own architecture, responsibilities, boundaries, tests, and operational constraints. Incorporate applicable general guidance from [this repository's `AGENTS.md`](AGENTS.md) without discarding local rules; shared skills supplement rather than override project instructions. Review [the installation and validation guide](docs/INSTALLATION.md) when setting up a new project.

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

See [MCP interface contracts](docs/MCP_INTERFACE_CONTRACTS.md), [adaptability and modularity](docs/ADAPTABILITY.md), [design rationale](docs/DESIGN.md), [task examples](docs/EXAMPLES.md), [requirements-review acceptance cases](docs/REQUIREMENTS_REVIEW_CASES.md), and [attribution](ATTRIBUTION.md).

Key departure from the original inspiration: this project explicitly prioritizes maintainable system architecture and dependency-aware contract changes over strictly minimizing changed lines or code size.

## Contributing

Changes should explain which coding-agent failure mode they address and how improvement could be observed in a representative task. Keep always-on instructions concise and skill descriptions narrowly scoped.

## License

Licensed under the [MIT License](LICENSE). You may use, modify, and redistribute the material under its terms.
