# MCP interface contracts

This document details the engineering requirements for MCP servers and their tool catalogs. Apply the current MCP specification and the version supported by the project's SDK; distinguish protocol-mandated behavior, specification recommendations, and the additional engineering policy below. Repository-specific architectural and authorization contracts remain authoritative for their domains.

## Server orientation and discovery

- Include server-level instructions when supported by the SDK and client protocol. Explain the server's purpose, authoritative domain vocabulary, recommended starting workflow, prerequisites and tool sequencing, and important read/write or approval boundaries. Derive concepts from existing domain documentation rather than inventing a parallel ontology.
- Expect that clients may not relay server instructions to the model. Make individual tools understandable without relying on a separately read server prompt.
- Use a discoverable catalog for tool names, descriptions, schemas and annotations, and verify that registered capabilities match the catalog.
- Keep orientation informative, not authoritative for access control; enforce authentication, authorization, and approval in runtime code.

## Tool descriptions and parameters

- Every tool description must answer what it does and when to choose it; distinguish overlapping tools with specific, non-generic selection guidance.
- Document prerequisites, important follow-up operations, observable side effects, scope, and security boundaries without replacing purpose with boilerplate security language.
- Give every semantically nontrivial parameter a human-readable description in its input schema. Prioritize type vocabularies, directional or decision semantics, revision preconditions, opaque identifiers, and idempotency/replay keys.
- Use enumerations or other schema constraints only where the domain has an authoritative finite vocabulary. Avoid inventing constraints or making extensible domain types artificially closed.
- Keep parameter descriptions alongside their authoritative schemas or derive registrations from a single validated descriptor. Do not maintain conflicting copies of contract definitions.

## Results and errors

- Return tool results that clients can actually convey to the model. For MCP tools providing structured results, include a text representation carrying the actionable result so clients that expose only text content can still use it. A status-only string is insufficient when the result has substantive data.
- Prefer semantically equivalent, machine-readable representations (for example, serialized JSON) rather than lossy summaries. If output size requires bounds, define pagination, selection, or explicit limits as part of the tool contract; signal truncation and never silently omit required data.
- Use stable structured result shapes and output schemas when practical. Validate schema conformance and verify that the text and structured representations refer to the same result.
- Return errors through the mechanism appropriate to the failure: distinguish protocol/transport errors from tool execution failures, and represent tool execution errors with the MCP error-result convention when applicable. Include actionable safe details; never leak credentials or unauthorized project content.
- Apply output limits and authorization rules before producing either representation, so text fallback cannot bypass protections.

## Declarative ownership

- Maintain one reviewable source of truth for metadata, usage guidance and server instructions, using repository-appropriate data files or typed descriptors that load and validate declarative resources.
- Keep executable handlers, transport wiring, and security enforcement separate from descriptions. Reuse existing schema definitions rather than duplicating them in catalog files.
- Version changes that alter observable behavior, tool signatures, schemas or operational expectations; review compatibility and migration effects for existing clients.

## Verification and release acceptance

Test with actual SDK registration and protocol messages, not just direct handler calls:

1. Initialization and discovery expose appropriate instructions, names, distinct descriptions, input schemas, annotations and available output schemas.
2. Parameter semantics and allowable values are documented and validated against authoritative domain contracts.
3. Text-only consumers receive the substantive result; structured consumers receive matching valid structured data.
4. Empty results, large results, pagination and explicit output bounds are handled predictably without silent loss.
5. Success, tool execution failures and transport/protocol failures are distinguishable and actionable.
6. Identity and scope are derived from authenticated context; authorization and approval boundaries hold for all tool paths and output formats.
7. Catalog, registered interfaces, docs and runtime behavior remain consistent, including after tool additions and refactors.

Record which clients or compatibility profiles were actually exercised. A green build or a successful call without model-visible result inspection is insufficient evidence of a complete integration.
