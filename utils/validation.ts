// Validation utilities for forms
import { LLMProvider, LLMModel } from '../types';

export interface ValidationErrors {
  [key: string]: string;
}

export const validateProvider = (p: Partial<LLMProvider>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!p.name?.trim()) {
    errors.name = 'Name is required';
  } else if (p.name.length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(p.name)) {
    errors.name = 'Name can only contain letters, numbers, spaces, hyphens, and underscores';
  }
  
  if (!p.type) {
    errors.type = 'Provider type is required';
  }
  
  if (!p.baseUrl?.trim()) {
    errors.baseUrl = 'Base URL is required';
  } else if (!/^https?:\/\/.+/.test(p.baseUrl)) {
    errors.baseUrl = 'Please enter a valid URL (must start with http:// or https://)';
  }
  
  return errors;
};

export const validateModel = (m: Partial<LLMModel>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!m.providerId) {
    errors.providerId = 'Please select a provider';
  }
  
  if (!m.type) {
    errors.type = 'Model type is required';
  }
  
  if (!m.name?.trim()) {
    errors.name = 'Display name is required';
  } else if (m.name.length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  }
  
  if (!m.modelId?.trim()) {
    errors.modelId = 'Model ID is required';
  } else if (m.modelId.length > 100) {
    errors.modelId = 'Model ID cannot exceed 100 characters';
  }
  
  if (m.type === 'chat' || m.type === 'multimodal') {
    if (m.contextLength !== undefined && (m.contextLength < 1 || m.contextLength > 128000)) {
      errors.contextLength = 'Context length must be between 1 and 128,000';
    }
    if (m.maxTokens !== undefined && (m.maxTokens < 1 || m.maxTokens > 16384)) {
      errors.maxTokens = 'Max tokens must be between 1 and 16,384';
    }
    if (m.temperature !== undefined && (m.temperature < 0 || m.temperature > 2)) {
      errors.temperature = 'Temperature must be between 0 and 2';
    }
  }
  
  if (m.type === 'embedding') {
    const validDims = [768, 1024, 1536, 2048, 3072, 4096];
    if (m.dimensions !== undefined && !validDims.includes(m.dimensions)) {
      errors.dimensions = `Embedding dimensions should be one of: ${validDims.join(', ')}`;
    }
  }
  
  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
