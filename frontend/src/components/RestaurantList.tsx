import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteRestaurant } from "../services/api";
import type { Restaurant } from "../types/Restaurant";
import "../styles/RestaurantList.css";

interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onEdit,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [localRestaurants, setLocalRestaurants] =
    useState<Restaurant[]>(restaurants);

  React.useEffect(() => {
    setLocalRestaurants(restaurants);
  }, [restaurants]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      await deleteRestaurant(deleteId);
      setLocalRestaurants((prev) => prev.filter((r) => r.id !== deleteId));
      setDeleteId(null);
      setConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  return (
    <>
      <List className="restaurant-list">
        {localRestaurants.map((resto) => (
          <ListItem key={resto.id} divider>
            <ListItemText
              primary={resto.name}
              secondary={`Address: ${resto.address} | Contact: ${resto.contact}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(resto)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  if (resto.id !== null && resto.id !== undefined) {
                    handleDeleteClick(resto.id);
                  }
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      
      <Dialog open={confirmOpen} onClose={handleCancelDelete} className="confirm-dialog">
        <DialogTitle>
          Are you sure you want to delete this restaurant?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestaurantList;
