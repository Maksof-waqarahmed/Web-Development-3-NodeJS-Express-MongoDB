import mongoose, { Types } from "mongoose";

interface WishlistModel {
    user: Types.ObjectId;
    products: Types.ObjectId[];
}

const wishlistSchema = new mongoose.Schema<WishlistModel>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);

export const Wishlist = mongoose.model<WishlistModel>("Wishlist", wishlistSchema);
