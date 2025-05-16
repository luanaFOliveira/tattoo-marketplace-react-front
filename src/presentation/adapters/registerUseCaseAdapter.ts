import { UserDetail, UserRequest, UpdateUserRequest } from "@/domain/entities/user";
import { TattooArtist, TattooArtistRequest, UpdateTattooArtistRequest } from "@/domain/entities/tattoo-artist";

export interface RegisterUseCase<TRequest, TResponse> {
  create?: (data: TRequest, profilePicture?: File | null) => Promise<TResponse>;
  update?: (id: string, data: TRequest, profilePicture?: File | null) => Promise<TResponse>;
}

export const makeSignUpAdapter = (
    action: (data: UserRequest, profilePicture: File) => Promise<{ id: number }>
  ): RegisterUseCase<UserRequest, { id: number }> => ({
    create: (data, profilePicture) => action(data, profilePicture!),
  });
  
  export const makeUpdateUserAdapter = (
    action: (id: string, data: UpdateUserRequest, profilePicture: File | null) => Promise<UserDetail>
  ): RegisterUseCase<UpdateUserRequest, UserDetail> => ({
    update: (id, data, profilePicture) =>
      action(id, data, profilePicture ?? null),
  });
  
  export const makeRegisterTattooArtistAdapter = (
    action: (data: TattooArtistRequest, profilePicture: File) => Promise<{ id: number }>
  ): RegisterUseCase<TattooArtistRequest, { id: number }> => ({
    create: (data, profilePicture) => action(data, profilePicture!),
  });
  
  export const makeUpdateTattooArtistAdapter = (
    action: (id: string, data: UpdateTattooArtistRequest, profilePicture: File | null) => Promise<TattooArtist>
  ): RegisterUseCase<UpdateTattooArtistRequest, TattooArtist> => ({
    update: (id, data, profilePicture) =>
      action(id, data, profilePicture ?? null),
  });
  
  
