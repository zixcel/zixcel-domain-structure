# @zixcel/domain-structure

Deterministic, bounded DNS-name hierarchy for source adapters. It uses the
packaged public-suffix ruleset (`tldts@7.4.13`, including private suffixes) and
returns graph-ready nodes and `dns-subdomain-of` edges. The ruleset version is
part of the result so a later ruleset update cannot silently reinterpret old
observations.

`registrableDomain` is a public-suffix boundary, not a claim about a company,
person, ownership, sender authenticity, message meaning, or DNS resolution.
Unlisted suffixes retain the lexical hierarchy but have no asserted public
suffix or registrable domain. No network access or source text is retained.

## License

Apache-2.0. Copyright 2026 HAT Inc. See [LICENSE](LICENSE) and [NOTICE](NOTICE). External dependencies retain their respective licenses.

## Package integration

The package is an independently consumable unit. Callers reference its documented
interface through a versioned dependency and own application-specific composition
and integration.
