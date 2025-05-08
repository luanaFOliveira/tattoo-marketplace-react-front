import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface Item {
  id: number;
  name: string;
}

interface MultipleSelectChipProps<T extends Item> {
  items: T[]; 
  selectedItems: number[]; 
  onChange: (selectedIds: number[]) => void;
  label?: string;
}

export default function MultiSelect<T extends Item>({
  items,
  selectedItems,
  onChange,
  label = "Selecionar",
}: MultipleSelectChipProps<T>) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",").map(v => parseInt(v)) : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-chip-label" sx={{color:"#eaeaea"}}>{label}</InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={selectedItems} 
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((id) => {
              const item = items.find((c) => c.id === id);
              return item ? <Chip key={id} label={item.name} /> : null;
            })}
          </Box>
        )}
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: '#1e1e1e',  
            color: '#eaeaea',  
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#444444',  
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666666', 
          },
        }}
      >
        {items.map(({ id, name }) => (
          <MenuItem
            key={id}
            value={id}
            style={{
              fontWeight: selectedItems.includes(id)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
