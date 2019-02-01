import { MarkdownFile, RouteData } from '../types'

export const pruneRouteData = ({ content, frontmatter }: MarkdownFile): RouteData => ({ content, frontmatter })
