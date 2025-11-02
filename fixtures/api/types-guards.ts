import { z } from 'zod';
import type {
  createUserSchema,
  authUserSchema,
  errorResponseSchema,
  createFoodSchema,
  allFoodsSchema,
  editFoodSchema,
  deleteFoodSchema,
  invalidCredentialsSchema,
  errorMsgResponseSchema,
} from './schemas';

export type ApiRequestParams = {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  url: string;
  baseUrl?: string;
  body?: Record<string, unknown> | Array<Record<string, unknown>> | null;
  headers?: string;
};

export type ApiRequestResponse<T = unknown> = {
  status: number;
  body: T;
};

export type ApiRequestFn = <T = unknown>(
  params: ApiRequestParams
) => Promise<ApiRequestResponse<T>>;

export type ApiRequestMethods = {
  apiRequest: ApiRequestFn;
};

export type CreateUserResponse = z.infer<typeof createUserSchema>;
export type AuthUserResponse = z.infer<typeof authUserSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type CreateFoodResponse = z.infer<typeof createFoodSchema>;
export type GetAllFoodsResponse = z.infer<typeof allFoodsSchema>;
export type EditFoodResponse = z.infer<typeof editFoodSchema>;
export type DeleteFoodResponse = z.infer<typeof deleteFoodSchema>;
export type InvalidCredentialsResponse = z.infer<
  typeof invalidCredentialsSchema
>;
export type ErrorMsgResponse = z.infer<typeof errorMsgResponseSchema>;
