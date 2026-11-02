import { User } from './User.jsx'
import PropTypes from 'prop-types'

export function Post({ title, contents, author }) {
  return (
    <articles>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </articles>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
