/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

const Parser = require('rss-parser')

module.exports = {
  build: {
    feed: {
      url: 'https://laracasts.com/feed',
    },
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/images',
        destination: 'images'
      }
    },
  },
  events: {
    async beforeCreate(config) {
      // create a new Parser instance
      const parser = new Parser({
        customFields: {
          feed: ['subtitle'],
          item: ['summary'],
        }
      })

      // fetch and parse the feed
      const feed = await parser.parseURL(config.build.feed.url)

      // store the feed data in our config
      config.feed = {
        title: feed.title,
        subtitle: feed.subtitle,
        link: feed.link,
        updated_at: feed.lastBuildDate,
        posts: feed.items,
      }
    }
  },
  formattedDate(str) {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  },
}
