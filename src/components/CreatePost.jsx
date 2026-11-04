import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost } from '../api/posts'

import { useAuth } from '../contexts/AuthContext.jsx'

export function CreatePost() {
  const [token] = useAuth()
  const [title, setTitle] = useState('')

  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, { title, contents, imageUrl: imageUrl || undefined }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
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
          placeholder='https://picsum.photos/200/300/?blur=10'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <br />
      <label htmlFor='create-contents'>Ingredients & Instructions: </label>
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
        value={createPostMutation.isPending ? 'Sharing...' : 'Share recipe'}
        disabled={!title || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Recipe shared!
        </>
      ) : null}
    </form>
  )
}
