import { TattooArtist} from "@/domain/entities/tattoo-artist";


export interface TattooArtistRepository {
    getTattooArtist(id: string): Promise<TattooArtist>;
    getAllTattooArtists(): Promise<TattooArtist[]>;
}