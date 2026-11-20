import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_POSTS, GET_POSTS_BY_AUTHOR } from '../api/graphql/posts.js'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useGraphQLQuery(author ? GET_POSTS_BY_AUTHOR : GET_POSTS, {
    variables: { author, options: { sortBy, sortOrder } },
    fetchPolicy: 'cache-and-network',
  })

  const posts = postsQuery.data?.postsByAuthor ?? postsQuery.data?.posts ?? []

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Blog | Taste Buds</title>
        <meta
          name='description'
          content='Taste Buds is a recipe sharing app where users can share their favorite recipes and discover new ones from other users.'
        />
      </Helmet>
      <Header />
      <hr />
      <br />
      <h1>Welcome to Taste Buds</h1>
      <h2>The recipe sharing app!</h2>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <br />
      <br />
      <PostFilter
        field='Author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt', 'likeCount']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
