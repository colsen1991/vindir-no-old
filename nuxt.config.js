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
    description: 'Nettside for Christer Olsen Web & IT.',
    orientation: 'any',
    theme_color: '#009f83',
    background_color: '#fff'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    [ '@nuxtjs/google-analytics', { ua: 'UA-107229265-3' } ]
  ],
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    extractCSS: true,
    vendor: [
      '~/assets/img/placeholder-2-1.svg',
      'whatwg-fetch'
    ]
  },
  plugins: [
    './plugins/buefy',
    './plugins/components',
    './plugins/clipboard',
    './plugins/disqus',
    './plugins/lazyload'
  ],
  head: {
    htmlAttrs: { lang: 'no' },
    titleTemplate: '%s - Christer Olsen Web & IT',
    script: [ { src: 'https://use.fontawesome.com/992cf8b5f9.js', type: 'text/javascript', async: true } ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', href: '/humans.txt' },
      { rel: 'me', href: 'https://www.christerolsen.me', type: 'text/html' }
    ],
    meta: [
      { hid: 'description', name: 'description', content: 'Hjemmesider, konsulenttjenester og tekinisk hjelp.' },
      { name: 'theme-color', content: '#009f83' },
      { hid: 'og:title', property: 'og:title', content: 'Christer Olsen Web & IT' },
      { hid: 'og:description', property: 'og:description', content: 'Hjemmesider, konsulenttjenester og tekinisk hjelp.' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.christerolsen.no/logo-full.png' },
      { property: 'og:locale', content: 'no' },
      { property: 'og:site_name', content: 'Christer Olsen Web & IT' },
      { name: 'robots', content: 'index, follow' }
    ]
  },
  generate: {
    async routes () {
      return [
        {
          route: '/blogg',
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
