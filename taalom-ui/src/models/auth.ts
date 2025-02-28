import { Role } from "./roles";

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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    grade: number;
    birthDate: string;
    enrollementDate: string;
  }
