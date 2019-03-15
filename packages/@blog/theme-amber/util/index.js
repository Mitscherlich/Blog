import axios from 'axios'
import day from 'dayjs'

export const axiosGithub = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json'
  }
})

export const axiosJson = axios.create({
  headers: {
    Accept: 'application/json'
  }
})

export function renderMathInElement(el) {
  Promise.all([
    import(/* webpackChunkName: "katex" */ 'katex/dist/contrib/auto-render.min.js'),
    import(/* webpackChunkName: "katex" */ 'katex/dist/katex.min.css')
  ]).then(([{ default: renderMathInElement }]) => {
    renderMathInElement(el, {
      delimiters: [
        { left: '$', right: '$', display: false },
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ]
    })
  })
}

export function resolveCurrentPagination(posts, pagination, paginations) {
  const { interval } = paginations[pagination]
  return posts.slice(interval[0], interval[1])
}

export function normalizeTags(tagMap = {}) {
  return Object.keys(tagMap)
}

export function resolveTimelines(posts) {
  const result = {}
  for (const post of posts) {
    const date = day(post.frontmatter.date)
    const yearAndMonth = `${date.year()}-${date.month() + 1}`
    if (result[yearAndMonth]) {
      result[yearAndMonth].push(post)
    } else {
      result[yearAndMonth] = [post]
    }
  }
  return { keys: Object.keys(result), entities: result }
}
