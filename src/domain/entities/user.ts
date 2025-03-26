export interface User {
    id: number;
    token: string; 
    isTattooArtist: boolean;
    profilePicture: string;
}

export interface UserDetail {
    id: number;
    email: string;
    name: string;
    age: number;
    location: string;
    createdAt: string;
    updatedAt: string;
    profilePicture: string;
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
    isTattooArtist: boolean;
    profilePicture: string;

}
  