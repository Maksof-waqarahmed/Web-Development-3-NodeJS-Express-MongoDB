import { Request, Response } from "express";
import { Types } from "mongoose";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";

export const createOrder = async (
    req: Request<
        { userId: string },
        {},
        { addressId: string; paymentMethod: "card" | "cash" | "paypal" | "other" }
    >,
    res: Response
) => {
    try {
        const { userId } = req.params;
        const { addressId, paymentMethod } = req.body;

        if (
            !Types.ObjectId.isValid(userId) ||
            !Types.ObjectId.isValid(addressId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user or address id",
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        let totalAmount = 0;

        const orderItems = cart.items.map((item: any) => {
            totalAmount += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            };
        });

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,
            paymentMethod,
            paymentStatus: "pending",
            status: "pending",
            shippingAddress: addressId,
        });

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getUserOrders = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const { userId } = req.params;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id",
            });
        }

        const orders = await Order.find({ user: userId })
            .populate("items.product")
            .populate("shippingAddress")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getOrderById = async (
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

        const order = await Order.findById(orderId)
            .populate("items.product")
            .populate("shippingAddress");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};


export const updateOrderStatus = async (
    req: Request<
        { orderId: string },
        {},
        { status: "paid" | "shipped" | "completed" | "cancelled" }
    >,
    res: Response
) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id",
            });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};
