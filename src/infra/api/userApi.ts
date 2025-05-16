import { UserRepository } from "@/domain/repositories/userRepository";
import { UpdateUserRequest, UserApiResponse, UserDetail } from "@/domain/entities/user";

export class UserApi implements UserRepository {

  async getUser(id:string): Promise<UserDetail> {
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
    });

    const data = await response.json();
    return this.mapToUser(data);
  }

  async updateUser(id: string, data: UpdateUserRequest, profilePicture: File | null): Promise<UserDetail> {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
    formData.append("request", jsonBlob);
  
    if (profilePicture) {
      formData.append("profile_img", profilePicture);
    }
  
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, {
      method: "PUT",
      body: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  
    if (!response.ok) {
      throw new Error('Erro ao editar tatuador');
    }
  
    const responseData = await response.json();
    return this.mapToUser(responseData);
  }

   private mapToUser(data: UserApiResponse): UserDetail {
      return {
        id: data.id, 
        name: data.name,
        email: data.email,
        location: data.location,
        age: data.age,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        profilePicture: data.profilePicture
      };
    }

}
