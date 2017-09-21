const isStatic = !!process.env.STATIC

const blogPosts = require('./static/data/blogg.json')

module.exports = {
  css: [
    { src: './assets/style/bulma-alterations.scss', lang: 'sass' },
    { src: './assets/style/global.scss', lang: 'sass' }
  ],
  loading: {
    color: '#23d160'
  },
  manifest: {
    name: 'Christer Olsen Web & IT',
    short_name: 'CO Web & IT',
    display: 'standalone',
    description: 'Nettside for Christer Olsen. En frilanser innen fagfeltet Web & IT.',
    orientation: 'any',
    theme_color: '#3273dc',
    background_color: '#fff'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    extractCSS: true,
    vendor: [
      'buefy',
      'whatwg-fetch'
    ]
  },
  plugins: [
    './plugins/buefy',
    './plugins/components'
  ],
  head: {
    htmlAttrs: { lang: 'no_NO' },
    titleTemplate: '%s - Christer Olsen Web & IT',
    script: [ { src: 'https://use.fontawesome.com/992cf8b5f9.js', type: 'text/javascript', async: true } ],
    link: [
      { rel: 'favicon', href: '/favicon.ico' },
      { rel: 'author', href: '/humans.txt' },
      { rel: 'me', href: 'https://www.christerolsen.me', type: 'text/html' }
    ],
    meta: [
      { name: 'title', content: 'Christer Olsen Web & IT' },
      { name: 'description', content: 'Frilanser innen fagfeltet Web & IT. Hjemmesider, konsulenttjenester og tekinisk hjelp.' },
      { name: 'theme-color', content: '#3273dc' },
      { property: 'og:title', content: 'Christer Olsen Web & IT' },
      { property: 'og:description', content: 'Frilanser innen fagfeltet Web & IT. Hjemmesider, konsulenttjenester og tekinisk hjelp.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://www.christerolsen.no/logo-full.png' },
      { property: 'og:locale', content: 'no_NO' },
      { property: 'og:site_name', content: 'Christer Olsen Web & IT' },
      { name: 'robots', content: 'noindex' }
    ]
  },
  generate: {
    async routes () {
      return [
        {
          route: '/blogg/',
          payload: blogPosts
        },
        ...blogPosts.map(({ slug }) => {
          return {
            route: `/blogg/${slug}`,
            payload: require(`./static/data/${slug}.json`)
          }
        })
      ]
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.christerolsen.no',
    cacheTime: 1000 * 60 * 15,
    generate: isStatic,
    routes: [
      ...blogPosts.map(blogPost => `/blogg/${blogPost.slug}`)
    ]
  }
}
