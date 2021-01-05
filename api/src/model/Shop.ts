import * as mongoose from 'mongoose'

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  },
  {
    timestamps: true,
  },
)
export default mongoose.model('Shop', ShopSchema)
