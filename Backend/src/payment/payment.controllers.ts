import { Request, Response } from "express";
import { Types } from "mongoose";
import { Payment } from "./payment.model";
import { Order } from "../order/order.model";

export const createPayment = async (
    req: Request<
        {},
        {},
        {
            orderId: string;
            paymentMethod: "card" | "cash" | "paypal" | "other";
            transactionId?: string;
        }
    >,
    res: Response
) => {
    try {
        const { orderId, paymentMethod, transactionId } = req.body;

        if (!Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id",
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const existingPayment = await Payment.findOne({ order: orderId });
        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: "Payment already exists for this order",
            });
        }

        const paymentStatus =
            paymentMethod === "cash" ? "completed" : "pending";

        const payment = await Payment.create({
            order: order._id,
            amount: order.totalAmount,
            paymentMethod,
            status: paymentStatus,
            transactionId,
        });

        // If COD → mark order as paid immediately
        if (paymentStatus === "completed") {
            order.paymentStatus = "completed";
            order.status = "paid";
            await order.save();
        }

        return res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getPaymentByOrder = async (
    req: Request<{ orderId: string }>,
    res: Response
) => {
    try {
        const { orderId } = req.params;

        if (!Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id",
            });
        }

        const payment = await Payment.findOne({ order: orderId }).populate("order");

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment fetched successfully",
            data: payment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const updatePaymentStatus = async (
    req: Request<
        { paymentId: string },
        {},
        { status: "completed" | "failed"; transactionId?: string }
    >,
    res: Response
) => {
    try {
        const { paymentId } = req.params;
        const { status, transactionId } = req.body;

        if (!Types.ObjectId.isValid(paymentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment id",
            });
        }

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        payment.status = status;
        if (transactionId) {
            payment.transactionId = transactionId;
        }

        await payment.save();

        // sync order
        const order = await Order.findById(payment.order);
        if (order) {
            order.paymentStatus = status;
            order.status = status === "completed" ? "paid" : "pending";
            await order.save();
        }

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: payment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};
