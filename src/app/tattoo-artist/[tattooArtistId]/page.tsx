import { Container, Box, Typography, Paper } from "@mui/material";
import TattooArtistView from "@/presentation/pages/TattooArtistView";

export default async function TattooArtistDetail({
    params,
}:{
    params: Promise<{tattooArtistId: string}>
}){
    const tattooArtistId = (await params).tattooArtistId;
    return <TattooArtistView tattooArtistId={tattooArtistId} />;
}