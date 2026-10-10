import { rm } from 'node:fs/promises';
// Remove only this package's generated output before emitting executable ESM and types.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
