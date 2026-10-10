/** DNS topology describes labels and suffixes, never ownership or authentication. */
export type DomainNodeKind = 'top-label' | 'intermediate' | 'public-suffix' | 'registrable' | 'subdomain'
export interface DomainNode { id: string; name: string; kind: DomainNodeKind }
export interface DomainEdge { from: string; to: string; relation: 'dns-subdomain-of' }
export interface DomainHierarchy {
  observed: string
  publicSuffix: string | null
  suffixAuthority: 'icann' | 'private' | 'unlisted'
  registrableDomain: string | null
  ruleset: 'tldts@7.4.13'
  nodes: DomainNode[]
  edges: DomainEdge[]
}
