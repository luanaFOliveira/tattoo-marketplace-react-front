'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CircularProgress, Stack, Box, Avatar, Typography } from "@mui/material";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { GetAllTattooArtistUseCase } from "@/application/tattoo-artist/getAllTattooArtistUseCase";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


export default function TattooArtistSlider() {
  const [artists, setArtists] = useState<TattooArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const artistsPerPage = 3;
  const getAllTattooArtistUseCase = new GetAllTattooArtistUseCase(new TattooArtistApi());

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllTattooArtistUseCase.execute();
        setArtists(data);
      } catch (error) {
        console.error("Erro ao buscar tatuadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  const maxSteps = artists.length - artistsPerPage + 1;

  const currentArtists = artists.slice(
    activeStep,
    activeStep + artistsPerPage
  );

  return (
    <Stack spacing={4} alignItems="center">
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Stack direction="row" spacing={4} justifyContent="center">
          {currentArtists.map((artist) => (
            <Link key={artist.id} href={`/tattoo-artist/${artist.id}`} passHref style={{ textDecoration: "none" }}>
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ cursor: "pointer", width: 200 }}
              >
                <Avatar
                  src={`http://localhost:8089${artist.profilePicture}`}
                  alt={artist.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border: (theme) => `3px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography variant="subtitle1" color="primary" noWrap>
                  {artist.name}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Box>

      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Próximo
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Voltar
          </Button>
        }
        sx={{ maxWidth: 400, flexGrow: 1 }}
      />
    </Stack>
  );
}


// import 'swiper/css';
// import 'swiper/css/navigation';
// import './swiper-custom.css';

// export default function TattooArtistSlider() {
//   const [artists, setArtists] = useState<TattooArtist[]>([]);
//   const [loading, setLoading] = useState(true);
//   const getAllTattooArtistUseCase = new GetAllTattooArtistUseCase(new TattooArtistApi());

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const data = await getAllTattooArtistUseCase.execute();
//         setArtists(data);
//       } catch (error) {
//         console.error("Erro ao buscar tatuadores:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtists();
//   }, []);

//   if (loading) {
//     return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
//   }

//   return (
//     <Stack spacing={4}>
//       <Box sx={{ width: '100%', position: 'relative' }}>
//         <Swiper
//           modules={[Navigation]}
//           navigation
//           spaceBetween={20}
//           slidesPerView={3}
//           style={{ paddingBottom: '40px' }} 
//         >
//           {artists.map((artist) => (
//             <SwiperSlide key={artist.id}>
//               <Link href={`/tattoo-artist/${artist.id}`} passHref style={{ textDecoration: "none" }}>
//                 <Stack
//                   spacing={1}
//                   alignItems="center"
//                   sx={{ cursor: "pointer", textAlign: "center", width: "100%", maxWidth: 500, margin:"0 auto" }}
//                 >
//                   <Avatar
//                     src={`http://localhost:8089${artist.profilePicture}`}
//                     alt={artist.name}
//                     sx={{
//                       width: 120,
//                       height: 120,
//                       border: (theme) => `3px solid ${theme.palette.primary.main}`,
//                     }}
//                   />
//                   <Typography variant="subtitle1" color="primary" noWrap>
//                     {artist.name}
//                   </Typography>
//                 </Stack>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </Box>
//     </Stack>
//   );
// }
