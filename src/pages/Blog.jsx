import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts.js'

import { Header } from '../components/Header.jsx'

import { Helmet } from 'react-helmet-async'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

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
        fields={['createdAt', 'updatedAt']}
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
