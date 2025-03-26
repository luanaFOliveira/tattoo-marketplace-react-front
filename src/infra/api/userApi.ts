import { UserRepository } from "@/domain/repositories/userRepository";
import { UserDetail } from "@/domain/entities/user";

export class UserApi implements UserRepository {
  async getUser(id:string): Promise<UserDetail> {
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    const response = await fetch(`http://localhost:8089/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
    });

    const data = await response.json();

    const user: UserDetail = { 
        id: data.id, 
        name: data.name,
        email: data.email,
        location: data.location,
        age: data.age,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        profilePicture: data.profilePicture
    };
    return user;
  }

}
