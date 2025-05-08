import { Category } from './category';
import { UpdateUserRequest, UserRequest } from './user';

export interface TattooArtist {
    id: number;
    email: string;
    name: string;
    age: number;
    location: string;
    rate: number;
    categories: Category[];
    createdAt: string;
    updatedAt: string;
    images: string[];
    profilePicture: string;
}
  
export interface TattooArtistRequest extends UserRequest {
    categoryIds: number[];
}

export interface UpdateTattooArtistRequest extends UpdateUserRequest {
    categoryIds: number[];
}

export interface RateTattooArtistRequest{
    rate: number;
}