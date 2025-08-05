import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import RestaurantDialog from "./components/RestaurantDialog";
import { getRestaurants } from "./services/api.ts";
import type { Restaurant } from "./types/Restaurant";
import "./styles/App.css";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<
    Restaurant | undefined
  >(undefined);

    const fetchRestaurants = async () => {
    const { data } = await getRestaurants();
    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAdd = () => {
    setEditingRestaurant(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setDialogOpen(true);
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = async () => {
    await fetchRestaurants();
  };

  return (
    <Container maxWidth="lg" className="app-container">
      <Header onAddClick={handleAdd} />
      <RestaurantList restaurants={restaurants} onEdit={handleEdit} />
      <RestaurantDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        restaurant={editingRestaurant}
        onSave={handleSave}
      />
    </Container>
  );
}

export default App;
