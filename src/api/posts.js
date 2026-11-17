const backendUrl = import.meta.env.SSR
  ? 'http://localhost:3000/api/v1'
  : import.meta.env.VITE_BACKEND_URL

export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${backendUrl}/posts?` + new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const getPostById = async (postId) => {
  const res = await fetch(`${backendUrl}/posts/${postId}`)
  return await res.json()
}

export const createPost = async (token, post) => {
  const res = await fetch(`${backendUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  return await res.json()
}
