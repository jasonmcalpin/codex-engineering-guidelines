# Standards-first interoperability

Apply this policy whenever designing, implementing, extending, or integrating with an established protocol, framework, API, service, CLI, agent tool, or other machine-consumable interface. Protocol and ecosystem contracts extend beyond syntactically valid requests and responses. Use the protocol version and official documentation applicable to the project's dependencies and supported consumers; do not assume a model's memory of a standard is current.

## Establish the applicable contract

- Identify the relevant specifications, supported versions, SDK contracts, official integration guides, and established ecosystem conventions before substantial implementation.
- Distinguish **required** protocol behavior, **recommended** interoperability conventions, **optional** capabilities, and **project-specific** policies. Evaluate options against actual supported clients and system responsibilities; do not implement every optional feature indiscriminately.
- Identify discovery, metadata, schema, lifecycle, error, capability negotiation, and operational expectations applicable to the interface. Capture the intended client and compatibility matrix.
- Prefer standards and existing project integration patterns to new proprietary mechanisms; justify departures with their interoperability consequences.

## Design from the consumer boundary

- Make the interface discoverable, understandable, invocable, and interpretable without undocumented assumptions or insider knowledge.
- Use agreed conventions for formats, semantics, version negotiation, status/error signaling, authn/authz, retries, timeouts, cancellation, idempotency, pagination, resource bounds, and recovery, as applicable.
- Verify consumer-visible results rather than only successful server execution. Preserve meaningful content and explicit failure semantics across supported representation or transport variants.
- Keep one authoritative contract for schemas, metadata, and externally observable behavior where practical. Derive generated artifacts instead of maintaining inconsistent parallel definitions.

## Verify the integration

- Define acceptance checks against specification obligations and the supported client matrix: schema/contract conformance, discovery, normal and exceptional results, auth boundaries, lifecycle, failure handling, and realistic end-to-end consumption.
- Exercise representative clients and SDK versions when feasible. Where conformance suites or integration test harnesses exist, use them; document untested profiles and limitations.
- Distinguish *protocol compliant*, *interoperable with verified consumers*, and *production ready*; these are not interchangeable.
- Document deliberate deviations, unsupported optional capabilities relevant to consumers, compatibility impacts, and required mitigations. Do not silently degrade to a proprietary or partial contract.

## Technology-specific application

This policy is general. The [MCP interface contracts](MCP_INTERFACE_CONTRACTS.md) apply it to MCP server instructions, tool catalogs, parameter guidance, and text/structured result compatibility. Repository-specific domain and authorization contracts remain authoritative and may require stronger behavior than the protocol minimum.
