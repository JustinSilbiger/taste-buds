import { getUserInfoById } from '../services/users.js'

export const postSchema = `#graphql
  type Post {
    id: ID!
    title: String!
    author: User
    contents: String
    imageUrl: String
    tags: [String!]
    createdAt: Float
    updatedAt: Float
  }
`

export const postResolver = {
  Post: {
    author: async (post) => {
      if (!post.author) return null
      return await getUserInfoById(post.author)
    },
  },
}
