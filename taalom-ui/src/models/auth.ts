export interface AuthRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: User;
  }
  
  export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }
