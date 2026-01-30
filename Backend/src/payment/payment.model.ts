import mongoose, { Types } from "mongoose";

interface PaymentModel {
    order: Types.ObjectId;
    amount: number;
    paymentMethod: "card" | "cash" | "paypal" | "other";
    status: "pending" | "completed" | "failed";
    transactionId?: string;
}

const paymentSchema = new mongoose.Schema<PaymentModel>(
    {
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
        amount: { type: Number, required: true },
        paymentMethod: {
            type: String,
            enum: ["card", "cash", "paypal", "other"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        transactionId: { type: String },
    },
    { timestamps: true }
);

export const Payment = mongoose.model<PaymentModel>("Payment", paymentSchema);
