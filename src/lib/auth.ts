/**
 * Authentication and Authorization System
 * Healthcare-compliant user authentication
 */

interface AuthUser {
  id: string;
  email: string;
  role: 'patient' | 'admin' | 'practitioner';
  patientId?: string;
  permissions: string[];
}

/**
 * Authentication service for portal access
 */
export class AuthService {
  private currentUser: AuthUser | null = null;

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(permission: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  /**
   * Check if user has admin role
   */
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  /**
   * Check if user is a patient
   */
  isPatient(): boolean {
    return this.currentUser?.role === 'patient';
  }

  /**
   * Check if user is a practitioner
   */
  isPractitioner(): boolean {
    return this.currentUser?.role === 'practitioner';
  }

  /**
   * Simulate login (stub for Phase 2)
   */
  async login(email: string, password: string): Promise<AuthUser> {
    console.log('Auth login stubbed for Phase 2:', { email });
    
    // Stub return for development
    const mockUser: AuthUser = {
      id: 'user_' + Date.now(),
      email,
      role: email.includes('admin') ? 'admin' : 'patient',
      patientId: email.includes('admin') ? undefined : 'patient_' + Date.now(),
      permissions: email.includes('admin') 
        ? ['admin:read', 'admin:write', 'patient:read', 'patient:write']
        : ['patient:read', 'patient:write']
    };

    this.currentUser = mockUser;
    return mockUser;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    console.log('Auth logout stubbed for Phase 2');
    this.currentUser = null;
  }

  /**
   * Validate session (stub for Phase 2)
   */
  async validateSession(): Promise<boolean> {
    console.log('Session validation stubbed for Phase 2');
    // For development, always return true if user exists
    return this.currentUser !== null;
  }

  /**
   * Refresh authentication token (stub for Phase 2)
   */
  async refreshToken(): Promise<string> {
    console.log('Token refresh stubbed for Phase 2');
    return 'mock_token_' + Date.now();
  }
}

export const authService = new AuthService();

/**
 * React hook for authentication state
 */
export function useAuth() {
  return {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
    isPatient: authService.isPatient(),
    isPractitioner: authService.isPractitioner(),
    hasPermission: (permission: string) => authService.hasPermission(permission),
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
  };
}