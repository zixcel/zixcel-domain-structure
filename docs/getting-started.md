# Using @zixcel/domain-structure

Split a DNS name into a useful hierarchy while respecting public and private suffix rules.

## Before you start

The package parses names. It does not resolve DNS or establish ownership of a domain.

## First steps

Run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm test
```

## How to assess the result

- Normalize and classify domain-name parts.
- Produce nodes and edges for a domain-structure view.

A passing source-level check establishes only what that check observes. Keep missing configuration, unavailable services and unverified deployment paths visible.

## Continue reading

[Repository overview](../README.md)
