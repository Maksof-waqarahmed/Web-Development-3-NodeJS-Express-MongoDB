import mongoose, { Types } from "mongoose";

interface OrderItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}

interface OrderModel {
    user: Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
    paymentMethod: "card" | "cash" | "paypal" | "other";
    paymentStatus: "pending" | "completed" | "failed";
    shippingAddress: Types.ObjectId;
}

const orderSchema = new mongoose.Schema<OrderModel>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "completed", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["card", "cash", "paypal", "other"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model<OrderModel>("Order", orderSchema);
