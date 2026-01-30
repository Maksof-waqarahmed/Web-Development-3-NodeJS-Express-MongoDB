import mongoose from "mongoose";

interface ProductImage {
    url: string;
}

interface ProductModel {
    title: string;
    description?: string;
    price: number;
    stock: number;
    images: ProductImage[];
    isActive: boolean;
}

const productSchema = new mongoose.Schema<ProductModel>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

        stock: {
            type: Number,
            default: 0,
        },

        images: [
            {
                url: { type: String, required: true },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ProductModel>("Product", productSchema);
