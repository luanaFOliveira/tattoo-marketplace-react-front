import React from "react";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

type StatusChipProps = {
  status: string;
};

export default function StatusChip({ status }: StatusChipProps) {
    const normalizedStatus = status.toLowerCase();
  
    const statusConfig: Record<
      string,
      { label: string; bgColor: string; textColor: string; icon: React.ReactElement }
    > = {
      pending: { label: "PENDING", bgColor: "yellow", textColor: "black", icon: <AccessTimeIcon /> },
      approved: { label: "APPROVED", bgColor: "green", textColor: "white", icon: <CheckCircleIcon /> },
      rejected: { label: "REJECTED", bgColor: "red", textColor: "white", icon: <CancelIcon /> },
    };
  
    const { label, bgColor, textColor, icon } = statusConfig[normalizedStatus] || {
      label: "Unknown",
      bgColor: "gray",
      textColor: "white",
      icon: <HourglassEmptyIcon />,
    };
  
    return (
      <Chip
        label={label}
        icon={icon}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      />
    );
  }
  