export type ParseFunction = (pathname: string) => MarkdownFile

export interface Configuration {
  contentFolder: string
  defaultLocale: string
  locales?: string[]
}

export type SafeConfiguration = Configuration & { readonly locales: string[] }

export interface RouteData {
  frontmatter: { [prop: string]: any }
  content: string
}

export interface MarkdownFile extends RouteData {
  root: boolean
  locale: string
  path: string
}

export interface BaseRoute {
  path: string
  component: string
  files: MarkdownFile[]
}

export interface Route {
  path: string
  component: string
  getData: () => RouteData | null
  children?: Route[] | []
}
