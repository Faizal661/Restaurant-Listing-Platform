import { Request, Response } from "express";
import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = async (_req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log("🚀 ~ Restaurants fetched:", restaurants.length);
    res.json(restaurants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, ...restOfBody } = req.body;

    const existingRestaurant = await Restaurant.findOne({
      where: { name: name },
    });
    
    if (existingRestaurant) {
      console.error(`Attempted to create a duplicate restaurant: ${name}`);
      return res
        .status(409)
        .json({ error: "A restaurant with this name already exists." });
    }
    const restaurant = await Restaurant.create({ name, ...restOfBody });
    console.log("🚀 ~ Restaurant created:", restaurant.toJSON());
    res.status(201).json(restaurant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      console.log("🚀 ~ Update failed: Restaurant not found");
      return res.status(404).json({ error: "Restaurant not found" });
    }
    await restaurant.update(req.body);
    console.log("🚀 ~ Restaurant updated:", restaurant.toJSON());
    res.json(restaurant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      console.log("🚀 ~ Deletion failed: Restaurant not found");
      return res.status(404).json({ error: "Restaurant not found" });
    }
    await restaurant.destroy();
    console.log("🚀 ~ Restaurant deleted:", req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
