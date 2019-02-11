import matter from 'gray-matter'
import path from 'path'
import buildRouteChildren from './buildRouteChildren'
import { BaseRoute, SafeConfiguration } from '../types'

const buildRoutes = (routes: BaseRoute[], { locales, defaultLocale, contentFolder }: SafeConfiguration) =>
  locales.map((locale) => {
    const {
      data: frontmatter,
      content,
    } = matter.read(
      path.resolve(
        process.cwd(),
        `${contentFolder}/index${locale !== defaultLocale ? `.${locale}` : ''}.md`,
      ),
    )

    return {
      path: `/${locale !== defaultLocale ? locale : ''}`,
      component: 'src/containers/index.js',
      getData: () => ({
        frontmatter,
        content,
      }),
      children: buildRouteChildren(routes, locale),
    }
  })

export default buildRoutes
