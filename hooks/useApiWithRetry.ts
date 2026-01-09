import { useState, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  maxRetries?: number;
  initialDelay?: number;
}

interface UseApiResult<T> {
  executeWithRetry: (request: () => Promise<T>) => Promise<T>;
  loading: boolean;
  error: Error | null;
}

export function useApiWithRetry<T = unknown>(
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { 
    onSuccess, 
    onError, 
    maxRetries = 3, 
    initialDelay = 1000 
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeWithRetry = useCallback(
    async (request: () => Promise<T>, retryCount = 0): Promise<T> => {
      try {
        setLoading(true);
        setError(null);
        const result = await request();
        onSuccess?.(result);
        return result;
      } catch (err) {
        const axiosError = err as { response?: { status: number } };
        const isServerError = (axiosError.response?.status ?? 0) >= 500;
        const isNetworkError = !axiosError.response;
        const shouldRetry = retryCount < maxRetries && (isServerError || isNetworkError);

        if (!shouldRetry) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setError(error);
          onError?.(error);
          throw error;
        }

        // Exponential backoff
        const delay = initialDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return executeWithRetry(request, retryCount + 1);
      } finally {
        setLoading(false);
      }
    },
    [maxRetries, initialDelay, onSuccess, onError]
  );

  return { executeWithRetry, loading, error };
}
