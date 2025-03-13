import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function TattooArtistCard() {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative', p: 1, backgroundColor: '#2c2c2c' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Tattoo Artist"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" color='white'>
            Tattoo Artist Name
          </Typography>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ color: 'gold', fontSize: 18 }} />
            <Typography variant="body2" color="white" sx={{ ml: 0.5 }}>
              4.8
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
            <LocationOnOutlinedIcon sx={{ color: 'white', fontSize: 18 }} />
            <Typography variant="body2" color="white">
                São Paulo, Brasil
            </Typography>
        </Box>
        <Chip label="Black & Grey" sx={{ mt: 1, backgroundColor:'white' }} />
      </CardContent>
    </Card>
  );
}
