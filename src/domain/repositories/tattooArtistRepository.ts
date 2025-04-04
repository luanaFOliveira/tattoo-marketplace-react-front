import { TattooArtist, TattooArtistRequest} from "@/domain/entities/tattoo-artist";


export interface TattooArtistRepository {
    getTattooArtist(id: string): Promise<TattooArtist>;
    getAllTattooArtists(): Promise<TattooArtist[]>;
    registerTattooArtist(data: TattooArtistRequest, profilePicture: File): Promise<{ id:number }>;
}