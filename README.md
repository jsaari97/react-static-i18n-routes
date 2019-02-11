# react-static-i18n-routes

> create react-static routes from markdown with i18n support

This is a utility library to quickly produce a i18n and SEO friendly react-static by generating i18n routes eg `/de/about`. Works great with Netlify CMS.

![codecov](https://img.shields.io/codecov/c/github/jsaari97/react-static-i18n-routes.svg?style=flat)

## Usage

In your react-static `static.config.js` file:
```js
import generateRoutes from 'react-static-i18n-routes'
// ...
getRoutes: async () => {
    const routes = generateRoutes({
      contentFolder: 'content',
      defaultLocale: 'en',
      locales: ['en', 'fi'],
    })

    return [
      ...routes,
      // rest of your routes
    ]
}
```

## API

- `contentFolder <string>`: Base folder where you store your markdown files
- `defaultLocale <string>`: Your default locale eg. `en`.
- `contentFolder <string>[]`: List of all your locales eg. `['en', 'de', 'se']`.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install react-static-i18n-routes
```

## License

MIT

