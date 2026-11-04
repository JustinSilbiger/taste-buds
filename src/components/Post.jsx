import { User } from './User.jsx'
import PropTypes from 'prop-types'

const FALLBACK_IMAGE_URL = 'https://picsum.photos/200/300/?blur=7'

export function Post({ title, contents, author, imageUrl }) {
  return (
    <article>
      <h3>{title}</h3>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'cover' }}
          onError={(e) => {
            if (e.currentTarget.dataset.fallback) {
              e.currentTarget.style.display = 'none'
            } else {
              e.currentTarget.dataset.fallback = 'true'
              e.currentTarget.src = FALLBACK_IMAGE_URL
            }
          }}
        />
      )}

      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
}
