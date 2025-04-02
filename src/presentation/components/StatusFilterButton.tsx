'use client';
import React, { useState } from "react";
import { Paper, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

type StatusFilterButtonProps = {
  onFilterChange: (status: string | null) => void;
};

const statusOptions = [
  { label: "All", value: null },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function StatusFilterButton({ onFilterChange }: StatusFilterButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (status: string | null) => {
    setSelectedStatus(status);
    onFilterChange(status);
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        component="div"
        sx={{
          p: "4px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: { xs: "50%", sm: "40%", md: "20%", lg: "12rem" },
          borderRadius: "16px",
          border: "2px solid #800080",
          backgroundColor: "secondary",
          mx: "auto",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Typography sx={{ color: "white", fontSize: "1rem" }}>
          {selectedStatus
            ? statusOptions.find((opt) => opt.value === selectedStatus)?.label
            : "Filtrar por status"}
        </Typography>
        <IconButton sx={{ color: "white" }} aria-label="filter">
          <FilterListIcon />
        </IconButton>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {statusOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
