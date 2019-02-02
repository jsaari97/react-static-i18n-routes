// tslint:disable:no-expression-statement
import test from 'ava'
import { pruneRouteData } from './utils'
import { MarkdownFile, RouteData } from '../types'

test('pruneRouteData returns correct shape', t => {
  const md: MarkdownFile = {
    content: '',
    frontmatter: { key: 'value' },
    root: false,
    locale: 'en',
    path: 'path',
  }

  const expected: RouteData = {
    content: '',
    frontmatter: { key: 'value' },
  }

  const result = pruneRouteData(md)
  t.deepEqual(result, expected)
})

test('pruneRouteData handles empty frontmatter', t => {
  const md: MarkdownFile = {
    content: '',
    frontmatter: {},
    root: false,
    locale: 'en',
    path: 'path',
  }

  const expected: RouteData = {
    content: '',
    frontmatter: {},
  }

  const result = pruneRouteData(md)
  t.deepEqual(result, expected)
})
