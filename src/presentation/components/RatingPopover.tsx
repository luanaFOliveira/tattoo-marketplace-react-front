import * as React from 'react';
import { Popover, Typography, Rating, Button } from '@mui/material';

type RatingPopoverProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  value: number;
  onChange: (newValue: number | null) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function RatingPopover({
  anchorEl,
  open,
  value,
  onChange,
  onClose,
  onSubmit
}: RatingPopoverProps) {
  return (
    <Popover
      id="rating-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center', 
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center', 
      }}
      PaperProps={{
        sx: {
          width: 250,
          p: 2,
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: 'white',  
        },
      }}
    >
      <Typography sx={{ mb: 1 }}>Rate this artist:</Typography>
      <Rating
        name="popover-rating"
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        sx={{
          borderColor: "white",
          '& .MuiRating-iconEmpty': {
            color: 'white', 
          }
        }}  
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onSubmit}
        sx={{ mt: 2 }}
        fullWidth
      >
        Submit
      </Button>
    </Popover>
  );
}
