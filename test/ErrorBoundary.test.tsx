import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const BrokenComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  it('should catch render errors and show fallback', () => {
    render(
      <ErrorBoundary fallback={<div>出错了</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('出错了')).toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn();
    
    render(
      <ErrorBoundary onError={onError} fallback={<div>Error</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );
    
    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe('Test error');
  });

  it('should render children when no error', () => {
    const WorkingComponent = () => <div>Working fine</div>;
    
    render(
      <ErrorBoundary fallback={<div>Error</div>}>
        <WorkingComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Working fine')).toBeInTheDocument();
  });

  it('should allow custom fallback function', () => {
    const CustomFallback = (error: Error, reset: () => void) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={reset}>Reset</button>
      </div>
    );
    
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <BrokenComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
});
