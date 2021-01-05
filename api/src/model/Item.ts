import * as mongoose from 'mongoose'

export const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)
export default mongoose.model('Item', ItemSchema)
