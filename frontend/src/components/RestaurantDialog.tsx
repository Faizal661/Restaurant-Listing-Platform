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
import axios from "axios";

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

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
    } else {
      setFormData({ id: null, name: "", address: "", contact: "" });
    }
    setErrors({ name: "", address: "", contact: "" });
  }, [restaurant, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "contact") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", address: "", contact: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (formData.address.trim().length < 6) {
      newErrors.address = "minimum 6 letters are required.";
      isValid = false;
    }

    if (formData.contact.trim().length !== 10) {
      newErrors.contact = "Enter 10 digits contact number.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.contact)) {
      newErrors.contact = "Contact must contain only numbers.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the form errors.");
      return;
    }

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
        if (axios.isAxiosError(error)) {
          console.error("Failed to add restaurant:", error);
          toast.error(error.response?.data.error || "Failed to add restaurant.");
        } else {
          console.error("Failed to add restaurant:", error);
          toast.error("Failed to add restaurant.");
        }
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
          error={!!errors.name}
          helperText={errors.name}
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
          error={!!errors.address}
          helperText={errors.address}
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
          error={!!errors.contact}
          helperText={errors.contact}
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
