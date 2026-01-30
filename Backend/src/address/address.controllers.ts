import { Request, Response } from "express";
import { Types } from "mongoose";
import { CreateAddressInput, createAddressSchema, UpdateAddressInput, updateAddressSchema } from "./address.schema";
import { Address } from "./adress.model";

export const createAddress = async (
    req: Request<{}, {}, CreateAddressInput>,
    res: Response
) => {
    try {
        const parsed = createAddressSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(err => err.message),
            });
        }

        const address = await Address.create(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getAddressById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid address id" });
        }

        const address = await Address.findById(id);

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Address fetched successfully",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const getAddressesByUser = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const { userId } = req.params;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        const addresses = await Address.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Addresses fetched successfully",
            data: addresses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const updateAddress = async (
    req: Request<{ id: string }, {}, UpdateAddressInput>,
    res: Response
) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid address id" });
        }

        const parsed = updateAddressSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(err => err.message),
            });
        }

        const updated = await Address.findByIdAndUpdate(id, parsed.data, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updated,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const deleteAddress = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid address id" });
        }

        const deleted = await Address.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};
