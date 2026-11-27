type ErrorMapper = (response: Response) => Error | Promise<Error>;

type RequestOptions = RequestInit & {
  errorMessage: string;
  mapError?: ErrorMapper;
};

const requestResponse = async (
  input: RequestInfo | URL,
  { errorMessage, mapError, ...init }: RequestOptions
) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw mapError ? await mapError(response) : new Error(errorMessage);
  }

  return response;
};

export const request = async (
  input: RequestInfo | URL,
  options: RequestOptions
) => {
  await requestResponse(input, options);
};

export const requestJson = async <T>(
  input: RequestInfo | URL,
  options: RequestOptions
): Promise<T> => {
  const response = await requestResponse(input, options);
  return response.json() as Promise<T>;
};
