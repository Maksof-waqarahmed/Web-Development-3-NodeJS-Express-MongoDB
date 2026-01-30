import { Request, Response } from "express";
import Product from "./product.model";
import {
    createProductSchema,
    updateProductSchema,
    UpdateProductInput,
} from "./product.schema";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const parsed = createProductSchema.safeParse({
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
        });

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(e => e.message),
            });
        }

        const images =
            req.files && Array.isArray(req.files)
                ? req.files.map((file: any) => ({
                    url: file.path,
                }))
                : [];

        const product = await Product.create({
            ...parsed.data,
            images,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ isActive: true });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getProductById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const updateProduct = async (
    req: Request<{ id: string }, {}, UpdateProductInput>,
    res: Response
) => {
    try {
        const parsed = updateProductSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(e => e.message),
            });
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            parsed.data,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updated,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};


export const deleteProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const deleted = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};
