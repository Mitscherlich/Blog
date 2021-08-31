import { axiosJson } from 'utils/axios'

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
  views: number
}

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || 'c0aee12ff2404520861abaae2d4a1fcb'

export const fetchPostList = async (): Promise<Post[]> => {
  return await axiosJson.get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`)
}

export const getPostView = async (slug: string): Promise<number> => {
  const { count } = await axiosJson.get<{ count: number }, { count: number }>(
    'https://api.splitbee.io/v1/blog.mitscherlich.me/pageviews',
    {
      params: { slug },
      headers: { 'x-api-key': process.env.SPLITBEE_API_TOKEN },
    }
  )
  return count
}
