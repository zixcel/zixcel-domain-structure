import { parse } from 'tldts'

const RULESET = 'tldts@7.4.13'

/** DNS hierarchy, not an ownership, company, trust, or sender-authentication assertion. */
export function analyzeDomain(domain) {
  if (typeof domain !== 'string' || domain.length < 3 || domain.length > 253 ||
    domain !== domain.trim() || domain !== domain.toLowerCase() ||
    !/^[a-z0-9.-]+$/.test(domain) || !domain.includes('.') ||
    domain.split('.').some(label => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))) return null

  const parsed = parse(domain, { allowPrivateDomains: true, validateHostname: true })
  if (!parsed.hostname || parsed.hostname !== domain || parsed.isIp) return null
  const suffixAuthority = parsed.isIcann ? 'icann' : parsed.isPrivate ? 'private' : 'unlisted'
  const publicSuffix = suffixAuthority === 'unlisted' ? null : parsed.publicSuffix
  const registrableDomain = suffixAuthority === 'unlisted' ? null : parsed.domain
  const parts = domain.split('.')
  const nodes = []
  const edges = []
  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const name = parts.slice(index).join('.')
    const parent = index < parts.length - 1 ? parts.slice(index + 1).join('.') : null
    const kind = name === registrableDomain ? 'registrable'
      : name === publicSuffix ? 'public-suffix'
      : index === parts.length - 1 ? 'top-label'
      : registrableDomain && name.endsWith(`.${registrableDomain}`) ? 'subdomain' : 'intermediate'
    nodes.push({ id: `dns:${name}`, name, kind })
    if (parent) edges.push({ from: `dns:${name}`, to: `dns:${parent}`, relation: 'dns-subdomain-of' })
  }
  return { observed: domain, publicSuffix, suffixAuthority, registrableDomain, ruleset: RULESET, nodes, edges }
}
