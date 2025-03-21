import { TattooArtist } from "./tattoo-artist";
import { User } from "./user";
import { Status } from "./status";

export interface QuoteRequest {
    description: string;
    placement: string;
    color: string;
    size: number;
    userId: number;
    tattooArtistId: number;
}
  
export interface Quote {
    id: number;
    description: string;
    price: number;
    user: User;
    tattooArtist: TattooArtist;
    status: Status;
}

export interface QuoteExtended {
    id: number;
    description: string;
    placement: string;
    color: string;
    size: number;
    price: number;
    user: User;
    tattooArtist: TattooArtist;
    status: Status;
    images: string[];
}