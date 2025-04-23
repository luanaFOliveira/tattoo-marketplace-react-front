'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import QuoteList from '@/presentation/pages/QuoteList'; 
import ImageGallery from './ImageGallery';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TattooArtistTabProps = {
    images: string[];
    userId: number;
};

export default function TattooArtistTab({ images, userId }: TattooArtistTabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab
            label="Portifolio"
            {...a11yProps(0)}
            sx={{
            color: value === 0 ? 'primary.main' : 'white',
            fontWeight: value === 0 ? 'bold' : 'normal',
            }}
        />
        <Tab
            label="Quotes"
            {...a11yProps(1)}
            sx={{
            color: value === 1 ? 'primary.main' : 'white',
            fontWeight: value === 1 ? 'bold' : 'normal',
            }}
        />
      </Tabs>

    </Box>
      <CustomTabPanel value={value} index={0}>
        <ImageGallery images={images} userId={userId} showAddButton={true} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <QuoteList />
      </CustomTabPanel>

      
    </Box>
  );
}
