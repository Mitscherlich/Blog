import { Feed } from 'feed'
import { Post } from '../api/post'
import { formatSlug } from './slugFormat'

const domain = 'https://blog.mitscherlich.me'

export const generateRss = (posts: Post[]) => {
  const year = new Date().getFullYear()
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Mitscherlich's Blog",
    copyright: `All rights reserved ${year}, Mitscherlich Wei`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Mitscherlich Wei',
      email: 'mitscherlich36@gmail.com',
      link: 'https://mitscherlich.me',
    },
  })

  posts.forEach((post) => {
    if (post.published) {
      feed.addItem({
        title: post.name,
        id: `${domain}${formatSlug(post.date, post.slug)}`,
        link: `${domain}${formatSlug(post.date, post.slug)}`,
        description: post.preview,
        date: new Date(post.date),
      })
    }
  })

  return feed.rss2()
}
