import { pruneRouteData } from './utils'
import { BaseRoute, Route } from '../types'

const buildRouteChildren = (routes: BaseRoute[], locale: string): Route[] | [] =>
  routes.map((route): Route => {
    const rootRoute = route.files.find((file) => file.root && file.locale === locale)

    const posts = route.files.filter((file) => !file.root && file.locale === locale)

    const children = posts.map((child): Route => ({
      path: child.path,
      component: route.component,
      getData: () => pruneRouteData(child),
    }))

    return {
      path: route.path,
      component: route.component,
      getData: () => rootRoute ? { ...pruneRouteData(rootRoute), childRoutes: children } : null,
      children,
    }
  })

export default buildRouteChildren
