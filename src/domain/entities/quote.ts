import { TattooArtist } from "./tattoo-artist";
import { UserDetail } from "./user";
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
    user: UserDetail;
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
    user: UserDetail;
    tattooArtist: TattooArtist;
    status: Status;
    images: string[];
}

export interface UpdateQuote {
    price: number;
    statusId: number;
}

