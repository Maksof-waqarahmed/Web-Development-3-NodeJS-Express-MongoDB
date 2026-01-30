import { z } from "zod";
import { Types } from "mongoose";

export const objectIdSchema = z.custom<Types.ObjectId>(
    (val) => Types.ObjectId.isValid(val as any),
    { message: "Invalid ObjectId" }
);

export const createAddressSchema = z.object({
    user: objectIdSchema,
    country: z.string().trim().min(1),
    city: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
    addressLine: z.string().trim().min(1),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;