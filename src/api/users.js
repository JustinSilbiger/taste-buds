const backendUrl = import.meta.env.SSR
  ? 'http://localhost:3000/api/v1'
  : import.meta.env.VITE_BACKEND_URL

export const signup = async ({ username, password }) => {
  const res = await fetch(`${backendUrl}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to sign up')
  return await res.json()
}

export const login = async ({ username, password }) => {
  const res = await fetch(`${backendUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to login')
  return await res.json()
}

export const getUserInfo = async (id) => {
  const res = await fetch(`${backendUrl}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await res.json()
}
