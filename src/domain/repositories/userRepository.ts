import { UserDetail} from "@/domain/entities/user";


export interface UserRepository {
    getUser(id: string): Promise<UserDetail>;
}