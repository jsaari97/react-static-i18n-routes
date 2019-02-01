import path from 'path'
import find from 'find'
import { BaseRoute, ParseFunction } from '../types'

const loadMarkdown = (contentDirectory: string, parseFunc: ParseFunction): BaseRoute[] =>
  find.dirSync(path.join(process.cwd(), contentDirectory))
    .map((pathname) => {
      const route = pathname.split(contentDirectory.replace('.', ''))[1]
      return {
        path: route,
        component: `${path.join('src/containers', route)}.js`,
        files: find.fileSync(/\.md$/, pathname).map(parseFunc),
      }
    })

export default loadMarkdown
