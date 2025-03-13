export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    location: string;
    token?: string; 
}
  
export interface UserRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    age: number;
    location: string;
}
  
export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface LoginResponse {
    id: number;
    token: string;
}
  