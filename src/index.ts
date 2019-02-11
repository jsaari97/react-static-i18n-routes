import { loadMarkdown, parseMarkdown, buildRoutes } from './lib'
import { Configuration, Route, SafeConfiguration } from './types'

const main = (options: Configuration): Route[] => {
  // union of locales, in case user added defaultLocale to locales[]
  const config: SafeConfiguration = {
    ...options,
    locales: [...new Set([...(options.locales || []), options.defaultLocale])],
  }

  // retrieve markdown files
  const raw = loadMarkdown(options.contentFolder, parseMarkdown(config.defaultLocale))

  // format routes
  const routes = buildRoutes(raw, config)

  return routes
}

export default main
