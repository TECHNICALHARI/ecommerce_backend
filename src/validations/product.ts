import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(10),
  category: z.string().min(3),
  brand: z.string().min(3),
  imageUrls: z.array(z.string()),
  thumbnail: z.string(),
  countInStock: z.number().positive(),
  rating: z.number().positive().optional(),
  numReviews: z.number().positive().optional(),
  reviews: z.array(z.string()).optional(),
});

export const categorySchema = z.object({
  name: z.string(),
  id:z.string().optional()
});
export const brandSchema = z.object({
  name: z.string(),
});

export type ProductInputTypes = z.infer<typeof productSchema>;
export type categoryTypes = z.infer<typeof categorySchema>;
export type brandTypes = z.infer<typeof brandSchema>;
