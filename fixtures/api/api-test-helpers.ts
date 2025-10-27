import { expect } from '../pom/test-options';
import { errorResponseSchema, invalidCredentialsSchema } from './schemas';
import { ErrorResponse, InvalidCredentialsResponse } from '../api/types-guards';

interface ApiRequestFunction {
  <T>(params: {
    method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
    baseUrl: string;
    url: string;
    body: Record<string, unknown>;
  }): Promise<{ status: number; body: T }>;
}

export async function testInvalidValues(
  values: string[],
  buildRequestBody: (value: string) => Record<string, unknown>,
  apiRequest: ApiRequestFunction,
  url: string,
  useInvalidCredentialsSchema = false
) {
  for (const value of values) {
    const isEmptyOrWhiteSpace = value.trim() === '';
    const body = buildRequestBody(value);

    if (useInvalidCredentialsSchema && !isEmptyOrWhiteSpace) {
      const { status, body: responseBody } =
        await apiRequest<InvalidCredentialsResponse>({
          method: 'POST',
          baseUrl: process.env.API_URL as string,
          url,
          body,
        });

      expect(status).toBe(400);
      expect(invalidCredentialsSchema.parse(responseBody)).toBeTruthy();
    } else {
      const { status, body: responseBody } = await apiRequest<ErrorResponse>({
        method: 'POST',
        baseUrl: process.env.API_URL as string,
        url,
        body,
      });

      expect(status).toBe(400);
      expect(errorResponseSchema.parse(responseBody)).toBeTruthy();
    }
  }
}

export function generateUniqueEmail(): string {
  return `${Date.now()}@example.com`;
}

export function generateUniqueUsername(): string {
  return `testUser_${Date.now()}`;
}
