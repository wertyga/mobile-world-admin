import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  previewName: {
    type: String,
  },
  previewImage: {
    type: String,
  },
  href: {
    type: String,
  },
  content: {
    type: String,
  },
  description: {
    type: String,
  },
  previewDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
  },
  destination: {
    type: Array,
    default: [],
  },
  pathname: {
    type: Array,
    default: [],
  },
}, { timestamps: true })


export const Article = mongoose.model('article', articleSchema)