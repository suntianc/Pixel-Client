/**
 * ID Generation Utilities
 * Provides consistent ID generation across the application
 */

/**
 * Generate a unique ID with optional prefix
 * Format: {prefix}-{timestamp}-{random}
 */
export function generateId(prefix = 'id'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generate a short ID for display purposes
 * Format: {prefix}-{shortTimestamp}
 */
export function generateShortId(prefix = 'id'): string {
  const shortTimestamp = Date.now().toString(36).substring(-6);
  const random = Math.random().toString(36).substring(2, 6);
  return `${prefix}-${shortTimestamp}${random}`;
}

/**
 * Generate a session ID
 */
export function generateSessionId(): string {
  return generateId('session');
}

/**
 * Generate a message ID
 */
export function generateMessageId(): string {
  return generateId('msg');
}
