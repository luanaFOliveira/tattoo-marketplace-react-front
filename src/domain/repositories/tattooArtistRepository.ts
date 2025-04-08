import { TattooArtist, TattooArtistRequest, UpdateTattooArtistRequest} from "@/domain/entities/tattoo-artist";


export interface TattooArtistRepository {
    getTattooArtist(id: string): Promise<TattooArtist>;
    getAllTattooArtists(): Promise<TattooArtist[]>;
    registerTattooArtist(data: TattooArtistRequest, profilePicture: File): Promise<{ id:number }>;
    updateTattooArtist(id: string, data: UpdateTattooArtistRequest, profilePicture: File | null): Promise<TattooArtist>;
}