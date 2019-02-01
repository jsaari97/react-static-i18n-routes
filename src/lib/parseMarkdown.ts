import matter from 'gray-matter'
import path from 'path'
import slugify from 'slugify'
import { MarkdownFile } from '../types'

const parseMarkdown = (defaultLocale: string) => (pathname: string): MarkdownFile => {
  const { data: frontmatter, content } = matter.read(pathname)
  const filename = path.basename(pathname, 'md')

  const split = filename.split('.')

  return {
    frontmatter,
    content,
    root: filename.indexOf('index') !== -1,
    locale: split[1] || defaultLocale,
    path: `${slugify(split[0].replace(/^\//, ''))}`
  }
}

export default parseMarkdown
