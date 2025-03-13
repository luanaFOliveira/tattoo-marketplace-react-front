export interface AuthRepository {
    login(email: string, password: string): Promise<{ id: number; token: string }>;
    signUp(name: string, email: string, password: string, passwordConfirm: string, location: string, age: number): Promise<{ id:number }>;
    logout(): Promise<void>;
}