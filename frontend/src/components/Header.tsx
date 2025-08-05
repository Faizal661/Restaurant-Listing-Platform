import React from "react";
import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import "../styles/Header.css";

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <div className="header-container">
      <Typography variant="h4" component="h1">
        Restaurants 🍽️
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onAddClick}>
        Add Restaurant
      </Button>
    </div>
  );
};

export default Header;
