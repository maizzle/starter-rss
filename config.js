/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the base configuration that Maizzle will use when you run commands
| like `npm run build` or `npm run dev`. Additional config files will
| inherit these settings, and can override them when necessary.
|
*/

// const Parser = require('rss-parser')
import Parser from 'rss-parser'

/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    content: ['emails/**/*.html'],
    static: {
      source: ['images/**/*.*'],
      destination: 'images',
    },
    feed: {
      url: 'https://laracasts.com/feed',
    },
  },
  async beforeCreate({config}) {
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
  },
  formattedDate(str) {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  },
}
