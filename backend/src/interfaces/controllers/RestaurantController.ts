import { Request, Response } from "express";
import { GetAllRestaurants } from "../../application/usecases/restaurant/GetAllRestaurants";
import { CreateRestaurant } from "../../application/usecases/restaurant/CreateRestaurant";
import { UpdateRestaurant } from "../../application/usecases/restaurant/UpdateRestaurant";
import { DeleteRestaurant } from "../../application/usecases/restaurant/DeleteRestaurant";

export class RestaurantController {
  constructor(
    private getAll: GetAllRestaurants,
    private create: CreateRestaurant,
    private update: UpdateRestaurant,
    private remove: DeleteRestaurant
  ) {}

  getAllRestaurants = async (_req: Request, res: Response) => {
    try {
      const restaurants = await this.getAll.execute();
      res.json(restaurants);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  createRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = await this.create.execute(req.body);
      res.status(201).json(restaurant);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  updateRestaurant = async (req: Request, res: Response) => {
    try {
      const updated = await this.update.execute(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ error: "Not found" });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const success = await this.remove.execute(Number(req.params.id));
      if (!success) return res.status(404).json({ error: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
