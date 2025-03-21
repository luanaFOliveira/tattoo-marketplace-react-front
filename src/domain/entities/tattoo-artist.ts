import { Category } from './category';

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
}
  
export interface TattooArtistRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    age: number;
    location: string;
    rate: number;
    categoryIds: number[];
}