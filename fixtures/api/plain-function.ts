import type { APIRequestContext, APIResponse } from '@playwright/test';

async function apiRequest({
  request,
  method,
  url,
  baseUrl,
  body = null,
  headers,
}: {
  request: APIRequestContext;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  url: string;
  baseUrl?: string;
  body?: Record<string, unknown> | null;
  headers?: string;
}): Promise<{ status: number; body: unknown }> {
  let response: APIResponse;

  const options: {
    data?: Record<string, unknown> | null;
    headers?: Record<string, string>;
  } = {};

  if (body) {
    options.data = body;
  }

  if (headers) {
    options.headers = {
      Authorization: `Bearer ${headers}`,
      'Content-Type': 'application/json',
    };
  } else {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const fullUrl = baseUrl ? `${baseUrl}${url}` : url;

  switch (method.toUpperCase()) {
    case 'GET':
      response = await request.get(fullUrl, options);
      break;
    case 'POST':
      response = await request.post(fullUrl, options);
      break;
    case 'PATCH':
      response = await request.patch(fullUrl, options);
      break;
    case 'DELETE':
      response = await request.delete(fullUrl, options);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  const status = response.status();

  let bodyData: unknown = null;
  const contentType = response.headers()['Content-Type'] || '';

  try {
    if (contentType.includes('application/json')) {
      bodyData = await response.json();
    } else if (contentType.includes('text/')) {
      bodyData = await response.text();
    }
  } catch (err) {
    console.warn(`Failed to parse response body for status ${status}: ${err}`);
  }

  return { status, body: bodyData };
}
