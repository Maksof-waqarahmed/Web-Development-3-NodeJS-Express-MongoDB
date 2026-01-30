import { Request, Response } from "express";
import { Types } from "mongoose";
import { Cart } from "./cart.model";

export const addToCart = async (
    req: Request<{ userId: string }, {}, { productId: string; quantity?: number }>,
    res: Response
) => {
    try {
        const { userId } = req.params;
        const { productId, quantity = 1 } = req.body;


        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user or product id" });
        }

        const productObjId = new Types.ObjectId(productId);

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productObjId, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productObjId, quantity });
            }
            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error " + error });
    }
};

export const getUserCart = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const { userId } = req.params;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            return res.status(200).json({ success: true, message: "Cart is empty", data: { items: [] } });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error " + error });
    }
};

export const updateCartItem = async (
    req: Request<{ userId: string }, {}, { productId: string; quantity: number }>,
    res: Response
) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user or product id" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error " + error });
    }
};

export const removeFromCart = async (
    req: Request<{ userId: string; productId: string }>,
    res: Response
) => {
    try {
        const { userId, productId } = req.params;

        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user or product id" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error " + error });
    }
};

export const clearCart = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const { userId } = req.params;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error " + error });
    }
};
