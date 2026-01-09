import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useApiWithRetry } from '../hooks/useApiWithRetry';

describe('useApiWithRetry Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return loading state initially false', () => {
    const { result } = renderHook(() => useApiWithRetry());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should execute request successfully without retry', async () => {
    const mockRequest = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useApiWithRetry());

    await result.current.executeWithRetry(mockRequest);

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should retry on server error with exponential backoff', async () => {
    const mockRequest = vi.fn()
      .mockRejectedValueOnce({ response: { status: 500 } })
      .mockRejectedValueOnce({ response: { status: 500 } })
      .mockResolvedValue('success');

    const { result } = renderHook(() => useApiWithRetry({ maxRetries: 3, initialDelay: 100 }));

    const promise = result.current.executeWithRetry(mockRequest);

    // Fast-forward through all timers
    await waitFor(() => {
      vi.advanceTimersByTime(400); // 100 + 200 = 300ms
    });

    await promise;

    expect(mockRequest).toHaveBeenCalledTimes(3);
    expect(result.current.loading).toBe(false);
  });

  it('should stop retrying after maxRetries exceeded', async () => {
    const mockRequest = vi.fn().mockRejectedValue({ response: { status: 500 } });
    const onError = vi.fn();

    const { result } = renderHook(() => useApiWithRetry({ 
      maxRetries: 2, 
      initialDelay: 100,
      onError 
    }));

    await expect(result.current.executeWithRetry(mockRequest)).rejects.toEqual({ response: { status: 500 } });

    expect(mockRequest).toHaveBeenCalledTimes(3); // Initial + 2 retries
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should not retry on client error (4xx)', async () => {
    const mockRequest = vi.fn().mockRejectedValue({ response: { status: 400 } });
    const onError = vi.fn();

    const { result } = renderHook(() => useApiWithRetry({ onError }));

    await expect(result.current.executeWithRetry(mockRequest)).rejects.toEqual({ response: { status: 400 } });

    expect(mockRequest).toHaveBeenCalledTimes(1); // No retry for client errors
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should call onSuccess callback on success', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockRequest = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { result } = renderHook(() => useApiWithRetry({ onSuccess }));

    await result.current.executeWithRetry(mockRequest);

    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });
});
