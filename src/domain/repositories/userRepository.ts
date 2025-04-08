import { UpdateUserRequest, UserDetail} from "@/domain/entities/user";


export interface UserRepository {
    getUser(id: string): Promise<UserDetail>;
    updateUser(id: string, data: UpdateUserRequest, profilePicture: File | null): Promise<UserDetail>;
}