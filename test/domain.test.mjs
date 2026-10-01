import assert from 'node:assert/strict'
import test from 'node:test'
import { analyzeDomain } from '../src/index.mjs'

test('builds a deterministic DNS graph without inferring a company', () => {
  const graph = analyzeDomain('mail.example.co.jp')
  assert.equal(graph.publicSuffix, 'co.jp')
  assert.equal(graph.registrableDomain, 'example.co.jp')
  assert.equal(graph.suffixAuthority, 'icann')
  assert.deepEqual(graph.nodes.map(node => [node.name, node.kind]), [
    ['jp', 'top-label'], ['co.jp', 'public-suffix'], ['example.co.jp', 'registrable'], ['mail.example.co.jp', 'subdomain']
  ])
  assert.deepEqual(graph.edges.map(edge => [edge.from, edge.to]), [
    ['dns:co.jp', 'dns:jp'], ['dns:example.co.jp', 'dns:co.jp'], ['dns:mail.example.co.jp', 'dns:example.co.jp']
  ])
  assert.equal(JSON.stringify(graph).includes('organization'), false)
})

test('private suffix is a boundary; unlisted suffix and malformed input stay unknown', () => {
  const privateName = analyzeDomain('team.github.io')
  assert.equal(privateName.suffixAuthority, 'private')
  assert.equal(privateName.publicSuffix, 'github.io')
  assert.equal(privateName.registrableDomain, 'team.github.io')
  const unlisted = analyzeDomain('person.example.invalid')
  assert.equal(unlisted.suffixAuthority, 'unlisted')
  assert.equal(unlisted.registrableDomain, null)
  for (const bad of ['example.com.evil@attacker.test', '.example.com', 'EXAMPLE.COM', 'a..com', 'localhost']) {
    assert.equal(analyzeDomain(bad), null)
  }
})
