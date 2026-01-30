import mongoose, { Types } from "mongoose";

interface CartItem {
    product: Types.ObjectId;
    quantity: number;
}

interface CartModel {
    user: Types.ObjectId;
    items: CartItem[];
}

const cartSchema = new mongoose.Schema<CartModel>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Cart = mongoose.model<CartModel>("Cart", cartSchema);
