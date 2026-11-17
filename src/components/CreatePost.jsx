import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import slug from 'slug'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreatePost() {
  const [token] = useAuth()

  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [createPost, { loading, data, error }] = useGraphQLMutation(
    CREATE_POST,
    {
      variables: {
        title,
        contents,
        imageUrl: imageUrl || null,
      },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
      refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
    },
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    createPost().catch(() => {})
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Share your recipe:</h3>
        <label htmlFor='create-title'>Recipe Title: </label>
        <input
          type='text'
          id='create-title'
          name='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label htmlFor='create-image-url'>Photo URL: </label>
        <input
          type='url'
          id='create-image-url'
          name='create-image-url'
          placeholder='https://picsum.photos/200/300'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <br />

      <label htmlFor='create-contents'>Ingredients & Instructions:</label>
      <br />
      <br />
      <textarea
        id='create-contents'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />

      <br />
      <br />

      <input
        type='submit'
        value={loading ? 'Sharing...' : 'Share recipe'}
        disabled={!title.trim() || loading}
      />

      {error && <p role='alert'>Failed to share recipe: {error.message}</p>}

      {data?.createPost ? (
        <>
          <br />
          Recipe{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          shared successfully!
        </>
      ) : null}
    </form>
  )
}
