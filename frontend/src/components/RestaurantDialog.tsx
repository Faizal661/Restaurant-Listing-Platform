import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { addRestaurant, updateRestaurant } from "../services/api";
import type { Restaurant } from "../types/Restaurant";
import "../styles/RestaurantDialog.css";
import toast from "react-hot-toast";

interface RestaurantDialogProps {
  open: boolean;
  onClose: () => void;
  restaurant?: Restaurant;
  onSave: () => void;
}

const RestaurantDialog: React.FC<RestaurantDialogProps> = ({
  open,
  onClose,
  restaurant,
  onSave,
}) => {
  const [formData, setFormData] = useState<Restaurant>(
    restaurant || { id: null, name: "", address: "", contact: "" }
  );

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
    } else {
      setFormData({ id: null, name: "", address: "", contact: "" });
    }
  }, [restaurant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.id && restaurant) {
      try {
        await updateRestaurant(formData.id, formData);
        setFormData({ id: null, name: "", address: "", contact: "" });
        toast.success("Restaurant updated successfully!");
      } catch (error) {
        console.error("Failed to update restaurant:", error);
        toast.error("Failed to update restaurant.");
      }
    } else {
      try {
        await addRestaurant(formData);
        setFormData({ id: null, name: "", address: "", contact: "" });
        toast.success("New Restaurant Added successfully!");
      } catch (error) {
        console.error("Failed to add restaurant:", error);
        toast.error("Failed to add restaurant.");
      }
    }
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="restaurant-dialog">
      <DialogTitle>
        {restaurant ? "Edit Restaurant" : "Add New Restaurant"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="contact"
          label="Contact"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.contact}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          {restaurant ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantDialog;
