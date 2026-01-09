import { describe, it, expect, vi } from 'vitest';
import { validateProvider, validateModel, hasErrors } from '../utils/validation';
import { LLMProvider, LLMModel } from '../types';

describe('Validation Utilities', () => {
  describe('validateProvider', () => {
    it('should return errors for empty required fields', () => {
      const result = validateProvider({});
      expect(result.name).toBe('Name is required');
      expect(result.type).toBe('Provider type is required');
      expect(result.baseUrl).toBe('Base URL is required');
    });

    it('should return error for name exceeding 50 characters', () => {
      const result = validateProvider({ name: 'a'.repeat(51) });
      expect(result.name).toBe('Name cannot exceed 50 characters');
    });

    it('should return error for invalid name characters', () => {
      const result = validateProvider({ name: 'Test@Provider!' });
      expect(result.name).toBe('Name can only contain letters, numbers, spaces, hyphens, and underscores');
    });

    it('should return error for invalid URL format', () => {
      const result = validateProvider({ 
        name: 'Test Provider', 
        type: 'openai',
        baseUrl: 'not-a-valid-url' 
      });
      expect(result.baseUrl).toBe('Please enter a valid URL (must start with http:// or https://)');
    });

    it('should pass validation for valid provider', () => {
      const result = validateProvider({
        name: 'OpenAI Provider',
        type: 'openai',
        baseUrl: 'https://api.openai.com/v1'
      });
      expect(hasErrors(result)).toBe(false);
    });

    it('should accept http URLs', () => {
      const result = validateProvider({
        name: 'Local Provider',
        type: 'custom',
        baseUrl: 'http://localhost:12345'
      });
      expect(hasErrors(result)).toBe(false);
    });
  });

  describe('validateModel', () => {
    it('should return errors for empty required fields', () => {
      const result = validateModel({});
      expect(result.providerId).toBe('Please select a provider');
      expect(result.type).toBe('Model type is required');
      expect(result.name).toBe('Display name is required');
      expect(result.modelId).toBe('Model ID is required');
    });

    it('should return error for name exceeding 50 characters', () => {
      const result = validateModel({ name: 'a'.repeat(51) });
      expect(result.name).toBe('Name cannot exceed 50 characters');
    });

    it('should return error for modelId exceeding 100 characters', () => {
      const result = validateModel({ modelId: 'a'.repeat(101) });
      expect(result.modelId).toBe('Model ID cannot exceed 100 characters');
    });

    it('should return error for invalid context length', () => {
      const result = validateModel({
        name: 'GPT-4',
        modelId: 'gpt-4',
        providerId: '123',
        type: 'chat',
        contextLength: 200000
      });
      expect(result.contextLength).toBe('Context length must be between 1 and 128,000');
    });

    it('should return error for invalid max tokens', () => {
      const result = validateModel({
        name: 'GPT-4',
        modelId: 'gpt-4',
        providerId: '123',
        type: 'chat',
        maxTokens: 20000
      });
      expect(result.maxTokens).toBe('Max tokens must be between 1 and 16,384');
    });

    it('should return error for invalid temperature', () => {
      const result = validateModel({
        name: 'GPT-4',
        modelId: 'gpt-4',
        providerId: '123',
        type: 'chat',
        temperature: 3.0
      });
      expect(result.temperature).toBe('Temperature must be between 0 and 2');
    });

    it('should return error for invalid embedding dimensions', () => {
      const result = validateModel({
        name: 'Embedding Model',
        modelId: 'text-embedding-3-large',
        providerId: '123',
        type: 'embedding',
        dimensions: 1000
      });
      expect(result.dimensions).toBe('Embedding dimensions should be one of: 768, 1024, 1536, 2048, 3072, 4096');
    });

    it('should pass validation for valid chat model', () => {
      const result = validateModel({
        name: 'GPT-4 Turbo',
        modelId: 'gpt-4-turbo',
        providerId: '123',
        type: 'chat',
        contextLength: 128000,
        maxTokens: 4096,
        temperature: 0.7
      });
      expect(hasErrors(result)).toBe(false);
    });

    it('should pass validation for valid embedding model', () => {
      const result = validateModel({
        name: 'Text Embedding',
        modelId: 'text-embedding-3-small',
        providerId: '123',
        type: 'embedding',
        dimensions: 1536
      });
      expect(hasErrors(result)).toBe(false);
    });
  });

  describe('hasErrors', () => {
    it('should return false for empty errors object', () => {
      expect(hasErrors({})).toBe(false);
    });

    it('should return true for non-empty errors object', () => {
      expect(hasErrors({ name: 'Error message' })).toBe(true);
    });
  });
});
