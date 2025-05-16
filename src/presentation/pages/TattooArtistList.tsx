'use client';
import React, { useEffect, useState, useCallback  } from "react";
import { CircularProgress, Stack,Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TattooArtistCard from "@/presentation/components/TattooArtistCard";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { GetAllTattooArtistUseCase } from "@/application/tattoo-artist/getAllTattooArtistUseCase";
import { GetTattooArtistLocationsUseCase } from "@/application/tattoo-artist/getTattooArtistLocationsUseCase";
import SearchBar from "@/presentation/components/SearchBar";
import FilterBox from "../components/FilterBox";
import ExpandedFilter from "../components/ExpandedFilter";
import { useTheme, useMediaQuery } from '@mui/material';
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import { GetAllCategoriesUseCase } from "@/application/category/getAllCategoriesUseCase";


const getAllCategoriesUseCase = new GetAllCategoriesUseCase(new CategoryApi());
const tattooArtistApi = new TattooArtistApi();
const getAllTattooArtistUseCase = new GetAllTattooArtistUseCase(tattooArtistApi);
const getTattooArtistLocationsUseCase = new GetTattooArtistLocationsUseCase(tattooArtistApi);

export default function TattooArtistList() {
  const [artists, setArtists] = useState<TattooArtist[]>([]);
  const [loading, setLoading] = useState(true);
  

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 

  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  
  const [name, setSearchTerm] = React.useState<string>("");

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {
        category,
        location,
        name,
      };
      const data = await getAllTattooArtistUseCase.execute(filters);
      setArtists(data);
    } catch (error) {
      console.error("Failed to fetch tattoo artists:", error);
    } finally {
      setLoading(false);
    }
  }, [category, location, name]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategoriesUseCase.execute();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getTattooArtistLocationsUseCase.execute();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleFilters = () => {
    fetchArtists(); 
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchArtists();
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, p: 2, mt: 10 }}>
      
      {!isSmallScreen && (
        <Box sx={{ width: '250px' }}>
          <ExpandedFilter
            category={category}
            location={location}
            setCategory={setCategory}
            setLocation={setLocation}
            handleFilters={handleFilters}
            categories={categories}
            locations={locations}  
          />
        </Box>
      )}
  
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={4}>
          {isSmallScreen ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SearchBar onSearch={handleSearch} />
              <FilterBox 
                category={category}
                location={location}
                setCategory={setCategory}
                setLocation={setLocation}
                categories={categories}
                locations={locations}  
              />
            </Box>
          ) : (
            <SearchBar onSearch={handleSearch} />
          )}

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {artists.map((artist) => (
              <Grid key={artist.id} size={{ xs: 12, sm: 6, md: 3 }} component="div">
                <TattooArtistCard artist={artist} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
  
}
