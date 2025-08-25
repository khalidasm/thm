import { AppError } from '@/types';
import { ERROR_MESSAGES } from '@/constants';
export * from './api-response-builder';
export class AppErrorHandler {
  static createError(code: string, message: string, details?: unknown): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date(),
    };
  }
  static handleApiError(error: unknown): AppError {
    if (error instanceof Error) {
      return this.createError('API_ERROR', error.message, error.stack);
    }
    return this.createError('UNKNOWN_ERROR', 'An unknown error occurred', error);
  }
  static handleDatabaseError(error: unknown): AppError {
    if (error instanceof Error) {
      return this.createError('DATABASE_ERROR', ERROR_MESSAGES.DATABASE_ERROR, error.message);
    }
    return this.createError('DATABASE_ERROR', ERROR_MESSAGES.DATABASE_ERROR, error);
  }
  static handleValidationError(message: string, details?: unknown): AppError {
    return this.createError('VALIDATION_ERROR', message, details);
  }
}
export class ValidationUtils {
  static isValidSearchTerm(term: string): boolean {
    return term.trim().length > 0 && term.trim().length <= 100;
  }
  static sanitizeSearchTerm(term: string): string {
    return term.trim().toLowerCase();
  }
}
export class FormatUtils {
  static formatDuration(seconds?: number): string {
    if (!seconds) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
  static formatTimeAgo(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}
export class HttpUtils {
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    throw lastError;
  }
} 