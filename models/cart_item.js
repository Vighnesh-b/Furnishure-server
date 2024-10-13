import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  userid: {
    type: String,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: String,
        ref: 'Productid',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

export const CartItemModel = mongoose.model('CartItem', cartItemSchema, 'cart_items');