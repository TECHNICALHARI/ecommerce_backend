import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(10),
  category: z.string().min(3),
  brand: z.string().min(3),
  image: z.array(z.string()),
  thumbnail: z.string(),
  countInStock: z.number().positive(),
  rating: z.number().positive(),
  numReviews: z.number().positive(),
  reviews: z.array(z.string()),
});

export type ProductInputTypes = z.infer<typeof productSchema>;
