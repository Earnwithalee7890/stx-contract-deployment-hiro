/**
 * Error handling utilities for consistent error management
 */

export class AppError extends Error {
    public code: string;
    public statusCode: number;
    public isOperational: boolean;

    constructor(
        message: string,
        code: string = 'UNKNOWN_ERROR',
        statusCode: number = 500,
        isOperational: boolean = true
    ) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Predefined error types
export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR', 400);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 'NOT_FOUND', 404);
    }
}

export class NetworkError extends AppError {
    constructor(message: string = 'Network request failed') {
        super(message, 'NETWORK_ERROR', 503);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication required') {
        super(message, 'AUTH_ERROR', 401);
    }
}

/**
 * Safe error handler that extracts message from unknown errors
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'An unexpected error occurred';
}

/**
 * Log error with context
 */
export function logError(error: unknown, context?: string): void {
    const message = getErrorMessage(error);
    const prefix = context ? `[${context}] ` : '';
    console.error(`${prefix}${message}`, error);
}
