import { UserRequest, LoginRequest, LoginResponse} from "@/domain/entities/user";


export interface AuthRepository {
    login(userData: LoginRequest): Promise<LoginResponse>;
    signUp(userData: UserRequest, profileImage: File): Promise<{ id:number }>;
    logout(): Promise<void>;
}