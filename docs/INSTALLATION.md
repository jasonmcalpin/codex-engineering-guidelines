# Installation and consumption

The canonical guidance is `AGENTS.md`; canonical skills are `.agents/skills/<name>/SKILL.md`. Agent-specific files are discovery adapters, never independent rule copies. Project-specific rules belong outside the generated marked section and take precedence as project policy; verify the effective instruction hierarchy in each client.

## Codex

Codex reads project `AGENTS.md` and discovers project skills under `.agents/skills/`. For personal defaults, merge (do not blindly overwrite) guidance into `~/.codex/AGENTS.md` and install skills in `~/.agents/skills/`. See [Codex documentation](https://developers.openai.com/codex/) and [OpenAI skill path reference](https://developers.openai.com/api/reference/cli).

## Claude Code

For project use, create `CLAUDE.md` containing `@AGENTS.md` to import shared instructions rather than copying them. Expose shared skills with `ln -s ../.agents/skills .claude/skills` from the project root (create `.claude` first). For user-global use, place an equivalent import in `~/.claude/CLAUDE.md` pointing at the shared guidance file and link `~/.claude/skills` to the canonical skills directory. Claude Code documents project/user memory imports and `.claude/skills/` discovery in its [official documentation](https://code.claude.com/docs/en/memory) and [skills documentation](https://code.claude.com/docs/en/skills). Directory symlink traversal must be verified with the installed Claude Code version; do not assume it works solely from the directory path convention.

## Recommended: pinned submodule for long-lived projects

From the consumer root:

```sh
git submodule add https://github.com/jasonmcalpin/engineering-guidelines.git vendor/engineering-guidelines
git submodule update --init
mkdir -p .agents .claude
ln -s ../vendor/engineering-guidelines/.agents/skills .agents/skills
ln -s ../vendor/engineering-guidelines/.agents/skills .claude/skills
printf '@AGENTS.md\n' > CLAUDE.md
node vendor/engineering-guidelines/scripts/sync-into-project.mjs
node vendor/engineering-guidelines/scripts/sync-into-project.mjs --check
```

The consumer `AGENTS.md` must contain exactly one `<!-- engineering-guidelines:begin -->` and one `<!-- engineering-guidelines:end -->` marker, in that order. The sync command also initializes a missing consumer `AGENTS.md`. Never hand-edit the generated region. Keep project-specific architecture, commands, and policy outside it. The sync script rewrites relative `docs/X.md` links to `vendor/engineering-guidelines/docs/X.md`. Update the submodule pin in a reviewed PR and rerun the sync script; the pinned commit is the review gate.

After cloning, run `git submodule update --init`. On Windows, enable Developer Mode or administrator privileges and `core.symlinks=true` before checkout; otherwise Git may materialize symlinks as plain text. Symlinked skill discovery is client/version-dependent: validate it in a fresh Codex and Claude Code session. If unsupported, use a documented local install/copy procedure as a compatibility fallback, while retaining the submodule as the sole upstream authority.

## Validate

1. Confirm each agent loads the intended instructions and skills in a fresh session; test discovery explicitly and implicitly.
2. Run `node vendor/engineering-guidelines/scripts/sync-into-project.mjs --check` in CI.
3. Confirm project-specific rules outside the generated region are preserved and effective.
4. Run representative positive and negative cases from [requirements-review acceptance cases](REQUIREMENTS_REVIEW_CASES.md).
5. Review the resulting diff and actual behavior. Instructions influence agent behavior but cannot guarantee compliance.

## Verification boundaries

Codex `AGENTS.md` and skill locations are documented by OpenAI. Claude Code's `CLAUDE.md` imports and skill locations require validation against the current official docs before deployment; directory symlink traversal in both agents has not been integration-tested here. Global import paths must be adjusted to the actual installation location.
