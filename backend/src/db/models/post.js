import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
    imageUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    likeCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

export const Post = mongoose.model('post', postSchema)
