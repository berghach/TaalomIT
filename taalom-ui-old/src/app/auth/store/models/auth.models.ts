export enum Role {
    ADMIN = 'ROLE_ADMIN',
    TEACHER = 'ROLE_TEACHER',
    STUDENT = 'ROLE_STUDENT'
  }
  
  export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    grade: number;
    birthDay: Date;
    enrollementDate: Date;
    token: string; 
  }
  
  export interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
  }
  