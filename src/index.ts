import matter from 'gray-matter'
import path from 'path'
import find from 'find'
import slugify from 'slugify'
import R from 'ramda'
import { Configuration, BaseRoute, MarkdownFile, RouteData, Route, ParseFunction, SafeConfiguration } from './types'

export { Configuration, Route }

const pruneRouteData = (route: MarkdownFile): RouteData => R.pick(['frontmatter', 'content'], route)

const getFilename = (pathname: string) => {
  const re = pathname.match(/([^/]*)\.[^.]*$/)
  if (!re) {
    throw new Error('could not get filename.')
  }

  return re[1]
}

const parseMarkdown = (defaultLocale: string) => (pathname: string): MarkdownFile => {
  const { data: frontmatter, content } = matter.read(pathname)
  const filename = getFilename(pathname)

  const split = filename.split('.')

  return {
    frontmatter,
    content,
    root: filename.indexOf('index') !== -1,
    locale: split[1] || defaultLocale,
    path: `${slugify(split[0].replace(/^\//, ''))}`
  }
}

const loadMarkdown = (contentDirectory: string, parseFunc: ParseFunction): BaseRoute[] =>
  find.dirSync(path.resolve(__dirname, contentDirectory))
    .map((pathname) => {
      const route = pathname.split(contentDirectory.replace('.', ''))[1]
      return {
        path: route,
        component: path.join('src/pages', route),
        files: find.fileSync(/\.md$/, pathname).map(parseFunc),
      }
    })

const buildRouteChildren = (routes: BaseRoute[], locale: string): Route[] | [] =>
  routes.map((route): Route => {
    const rootRoute = route.files.find(file => file.root && file.locale === locale)

    const posts = route.files.filter(file => !file.root && file.locale === locale)

    return {
      path: route.path,
      component: route.component,
      getData: () => rootRoute ? pruneRouteData(rootRoute) : null,
      children: posts.map((child): Route => ({
        path: child.path,
        component: route.component,
        getData: () => pruneRouteData(child)
      })),
    }
  })

const generateRoutes = (routes: BaseRoute[], { locales, defaultLocale, contentFolder }: SafeConfiguration) =>
  locales.map(locale => {
    const {
      data: frontmatter,
      content,
    } = matter.read(path.resolve(__dirname, `${contentFolder}/index${locale !== defaultLocale ? `.${locale}` : ''}.md`))

    return {
      path: `/${locale !== defaultLocale ? locale : ''}`,
      component: 'src/pages/',
      getData: () => ({
        frontmatter,
        content
      }),
      children: buildRouteChildren(routes, locale),
    }
  })

const main = (options: Configuration): Route[] => {
  // union of locales, in case user added defaultLocale to locales[]
  const config: SafeConfiguration = {
    ...options,
    locales: [...new Set([...(options.locales || []), options.defaultLocale])]
  }

  // retrieve markdown files
  const raw = loadMarkdown(options.contentFolder, parseMarkdown(config.defaultLocale))

  // format routes
  const routes = generateRoutes(raw, config)

  return routes
}

export default main
