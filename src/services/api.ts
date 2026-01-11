/**
 * n8n Webhook Integration Service with Supabase Authentication
 * Connects to n8n RAG workflow with secure authentication
 */

import { createClient } from '@supabase/supabase-js';

// ============================================================================
// Configuration
// ============================================================================

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
  'http://localhost:5678/webhook/4f68515a-6d29-4994-b42e-99f7b727c9e5';

const N8N_WEBHOOK_SECRET = import.meta.env.VITE_N8N_WEBHOOK_SECRET || '';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface N8nChatRequest {
  chatInput: string;
  sessionId: string;
}

export interface N8nChatResponse {
  success: boolean;
  output?: string;
  error?: {
    message: string;
  };
}

// Legacy support for existing code
export interface ApiRequestData {
  input: string;
  userId: string;
  sessionId: string;
  parameters?: Record<string, any>;
}

export interface ApiSuccessResponse {
  success: true;
  data: {
    output: string;
    metadata: {
      processingTime: number;
      timestamp: string;
    };
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: Record<string, any>;
  };
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// ============================================================================
// Authentication Functions (Supabase)
// ============================================================================

/**
 * Login with email and password
 */
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

/**
 * Sign up with email and password
 */
export const signup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

/**
 * Logout
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  clearSession();
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user !== null;
};

// ============================================================================
// Main n8n Communication Function
// ============================================================================

/**
 * Send message to n8n RAG Agent workflow
 * This connects to your existing n8n workflow with:
 * - OpenAI Chat Model
 * - Postgres Chat Memory (for conversation context)
 * - RAG tools (Supabase vector store, document tools)
 */
export const sendToN8n = async (
  message: string,
  sessionId: string
): Promise<N8nChatResponse> => {
  try {
    console.log('Sending to n8n:', { message, sessionId });

    const user = await getCurrentUser();

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Webhook-Secret': N8N_WEBHOOK_SECRET,
      },
      body: JSON.stringify({
        chatInput: message,
        sessionId: sessionId,
        userId: user?.id || 'anonymous'
      })
    });

    if (!response.ok) {
      throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('n8n response:', data);
    
    // n8n AI Agent returns the response in different possible formats
    // Handle various response structures
    const output = data.output || 
                   data.text || 
                   data.response || 
                   data.message ||
                   (typeof data === 'string' ? data : JSON.stringify(data));

    return {
      success: true,
      output: output
    };

  } catch (error) {
    console.error('n8n webhook error:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error 
          ? error.message 
          : 'Failed to connect to n8n RAG service'
      }
    };
  }
};

/**
 * Legacy function for backward compatibility with existing ChatArea code
 * Wraps sendToN8n with the old interface
 */
export const apiCall = async (inputData: ApiRequestData): Promise<ApiResponse> => {
  const startTime = Date.now();
  
  try {
    const result = await sendToN8n(inputData.input, inputData.sessionId);
    
    if (result.success && result.output) {
      return {
        success: true,
        data: {
          output: result.output,
          metadata: {
            processingTime: Date.now() - startTime,
            timestamp: new Date().toISOString()
          }
        }
      };
    } else {
      return {
        success: false,
        error: {
          message: result.error?.message || 'Unknown error',
          code: 'N8N_ERROR',
          details: {}
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Network error',
        code: 'NETWORK_ERROR',
        details: {}
      }
    };
  }
};

// ============================================================================
// Session Management
// ============================================================================

/**
 * Generates a unique user ID (persists across sessions)
 * This is stored in localStorage and used for user tracking
 */
export const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  
  return userId;
};

/**
 * Gets or creates a session ID for the current browser session
 * This is stored in sessionStorage and is used by n8n's Postgres Chat Memory
 * to maintain conversation context across multiple messages
 * 
 * IMPORTANT: This sessionId is what enables conversation memory in your n8n workflow
 */
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
    console.log('Created new session:', sessionId);
  }
  
  return sessionId;
};

/**
 * Clear the current session (forces new conversation context in n8n)
 */
export const clearSession = (): void => {
  sessionStorage.removeItem('sessionId');
  console.log('Session cleared - next message will start new conversation');
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Test connection to n8n webhook
 */
export const testN8nConnection = async (): Promise<boolean> => {
  try {
    const result = await sendToN8n('test connection', getSessionId());
    return result.success;
  } catch {
    return false;
  }
};

/**
 * Get current configuration info (for debugging)
 */
export const getConfig = async () => {
  const user = await getCurrentUser();
  return {
    webhookUrl: N8N_WEBHOOK_URL,
    userId: user?.id || 'anonymous',
    sessionId: getSessionId(),
    authenticated: user !== null
  };
};
