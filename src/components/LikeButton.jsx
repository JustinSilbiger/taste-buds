import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { likePost, unlikePost } from '../api/posts.js'

export function LikeButton({ postId, likes = [] }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const { sub } = token ? jwtDecode(token) : {}
  const hasLiked = Boolean(sub && likes.includes(sub))

  const likeMutation = useMutation({
    mutationFn: () =>
      hasLiked ? unlikePost(token, postId) : likePost(token, postId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['post', postId] }),
  })

  if (!token) return <div>Please log in to like recipes.</div>

  return (
    <button
      onClick={() => likeMutation.mutate()}
      disabled={likeMutation.isPending}
    >
      {likeMutation.isPending
        ? 'Saving...'
        : hasLiked
          ? '💔 Unlike'
          : '❤️ Like'}
    </button>
  )
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string),
}
