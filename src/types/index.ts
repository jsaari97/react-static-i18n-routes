export type ParseFunction = (pathname: string) => MarkdownFile

export interface Configuration {
  readonly contentFolder: string
  readonly defaultLocale: string
  readonly locales?: string[]
}

export type SafeConfiguration = Configuration & { readonly locales: string[] }

export interface RouteData {
  readonly frontmatter: { readonly [prop: string]: any }
  readonly content: string
  readonly childRoutes?: Route[]
}

export interface MarkdownFile extends RouteData {
  readonly root: boolean
  readonly locale: string
  readonly path: string
}

export interface BaseRoute {
  readonly path: string
  readonly component: string
  readonly files: MarkdownFile[]
}

export interface Route {
  readonly path: string
  readonly component: string
  readonly getData: () => RouteData | null
  readonly children?: Route[]
}
