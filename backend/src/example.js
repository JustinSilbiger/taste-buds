import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const post = new Post({
  title: 'Hello next post!',
  author: 'John D',
  contents: 'Example contents would go here.',
  tags: ['someTag', 'another tag'],
})
await post.save()

const posts = await Post.find()
console.log(posts)
