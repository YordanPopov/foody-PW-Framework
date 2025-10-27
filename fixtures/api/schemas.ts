import { z } from 'zod';

export const createUserSchema = z.object({
  msg: z.string(),
  email: z.string(),
  username: z.string(),
  accessToken: z.string().nullable(),
});

export const authUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  accessToken: z.string(),
});

export const errorResponseSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
  type: z.string(),
  title: z.string(),
  status: z.number(),
  traceId: z.string(),
});

export const invalidCredentialsSchema = z.object({
  msg: z.string(),
});

export const createFoodSchema = z.object({
  foodId: z.string(),
});

export const allFoodsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
  })
);

export const editFoodSchema = z.object({
  msg: z.string(),
  foodId: z.string(),
});

export const deleteFoodSchema = z.object({
  msg: z.string(),
});
