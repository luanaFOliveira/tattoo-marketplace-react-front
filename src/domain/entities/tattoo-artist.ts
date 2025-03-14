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
}
  