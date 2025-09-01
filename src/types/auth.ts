// Authentication form types
export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface SimpleRegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Password management types
export interface PasswordResetFormValues {
  email: string;
}

export interface PasswordResetWithTokenFormValues {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Profile management types
export interface ProfileUpdateFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  dateOfBirth?: Date;
}

export interface UsernameChangeFormValues {
  newUsername: string;
  password: string;
}

export interface EmailChangeFormValues {
  newEmail: string;
  password: string;
}

// Security types
export interface EmailVerificationFormValues {
  email: string;
  verificationCode: string;
}

export interface TwoFactorAuthFormValues {
  code: string;
}

// Account management types
export interface AccountDeletionFormValues {
  password: string;
  confirmDeletion: string;
  reason?: string;
}

export interface SessionFormValues {
  deviceName: string;
  rememberMe?: boolean;
}

// User data types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  dateOfBirth?: Date;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  deviceName: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActivity: Date;
  createdAt: Date;
}

// API response types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Form submission states
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error?: string;
  success?: string;
}

// Authentication states
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

// Login/Register options
export interface AuthOptions {
  rememberMe?: boolean;
  redirectTo?: string;
}

// Password strength types
export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
