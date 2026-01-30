import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0),
    stock: z.number().min(0),
    images: z
        .array(
            z.object({
                url: z.string().url(),
            })
        )
        .optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
