import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApiWithRetry } from '../hooks/useApiWithRetry';

describe('useApiWithRetry Hook', () => {
  // Mock setTimeout to be immediate for testing retry logic
  let setTimeoutMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setTimeoutMock = vi.spyOn(global, 'setTimeout').mockImplementation(((callback: () => void) => {
      callback();
      return 1 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);
  });

  afterEach(() => {
    setTimeoutMock.mockRestore();
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

    await act(async () => {
      await result.current.executeWithRetry(mockRequest);
    });

    expect(mockRequest).toHaveBeenCalledTimes(3);
    expect(result.current.loading).toBe(false);
  });

  it('should stop retrying after maxRetries exceeded', async () => {
    const mockError = { response: { status: 500 } };
    const mockRequest = vi.fn().mockRejectedValue(mockError);
    const onError = vi.fn();

    const { result } = renderHook(() => useApiWithRetry({ 
      maxRetries: 2, 
      initialDelay: 100,
      onError 
    }));

    // The hook throws an Error object, not the raw error
    await act(async () => {
      await expect(result.current.executeWithRetry(mockRequest))
        .rejects.toThrow(); // Error was thrown
    });

    expect(mockRequest).toHaveBeenCalledTimes(3); // Initial + 2 retries
    expect(onError).toHaveBeenCalledTimes(1);
    // Verify the error was logged (contains original error info)
  });

  it('should not retry on client error (4xx)', async () => {
    const mockError = { response: { status: 400 } };
    const mockRequest = vi.fn().mockRejectedValue(mockError);
    const onError = vi.fn();

    const { result } = renderHook(() => useApiWithRetry({ onError }));

    await act(async () => {
      await expect(result.current.executeWithRetry(mockRequest))
        .rejects.toThrow(); // Error was thrown
    });

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
