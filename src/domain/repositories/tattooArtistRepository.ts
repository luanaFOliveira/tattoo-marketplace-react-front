import { RateTattooArtistRequest, TattooArtist, TattooArtistRequest, UpdateTattooArtistRequest} from "@/domain/entities/tattoo-artist";


export interface TattooArtistRepository {
    getTattooArtist(id: string): Promise<TattooArtist>;
    getAllTattooArtists(filters: { category?: string, location?: string, name?:string, sortBy?: string, sortOrder?: string }): Promise<TattooArtist[]>;
    registerTattooArtist(data: TattooArtistRequest, profilePicture: File): Promise<{ id:number }>;
    updateTattooArtist(id: string, data: UpdateTattooArtistRequest, profilePicture: File | null): Promise<TattooArtist>;
    addPortifolioImages(id: string, images: File[]): Promise<TattooArtist>;
    getTattooArtistLocations(): Promise<string[]>;
    rateTattooArtist(id: string, data: RateTattooArtistRequest): Promise<TattooArtist>;
}