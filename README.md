# @zixcel/domain-structure

Split a DNS name into a useful hierarchy while respecting public and private suffix rules.

## What you can do

- Normalize and classify domain-name parts.
- Produce nodes and edges for a domain-structure view.

## Current scope

The package parses names. It does not resolve DNS or establish ownership of a domain.

Package distribution is not activated by this documentation. Use the checked-in source and the declared dependency versions; published availability must be verified separately.

## Getting started

Use the package manager matching the checked-in lockfile and the Node.js version declared in `package.json` or the development configuration. Run from this repository:

```sh
pnpm install --frozen-lockfile
pnpm test
```

## Documentation and source

[Usage guide](docs/getting-started.md)

[Implementation and public interfaces](src) · [Verification cases](test) · [Contributing](CONTRIBUTING.md) · [Security reporting](SECURITY.md) · [License](LICENSE) · [Attribution notices](NOTICE)
