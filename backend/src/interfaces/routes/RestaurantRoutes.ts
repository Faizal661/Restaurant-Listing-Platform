import express from "express";
import { RestaurantRepositoryImpl } from "../../infrastructure/database/repositories/RestaurantRepositoryImpl";
import { GetAllRestaurants } from "../../application/usecases/restaurant/GetAllRestaurants";
import { CreateRestaurant } from "../../application/usecases/restaurant/CreateRestaurant";
import { UpdateRestaurant } from "../../application/usecases/restaurant/UpdateRestaurant";
import { DeleteRestaurant } from "../../application/usecases/restaurant/DeleteRestaurant";
import { RestaurantController } from "../controllers/RestaurantController";

const router = express.Router();

// Wiring dependencies manually
const repo = new RestaurantRepositoryImpl();
const controller = new RestaurantController(
  new GetAllRestaurants(repo),
  new CreateRestaurant(repo),
  new UpdateRestaurant(repo),
  new DeleteRestaurant(repo)
);

router.route("/")
  .get(controller.getAllRestaurants)
  .post(controller.createRestaurant);

router.route("/:id")
  .patch(controller.updateRestaurant)
  .delete(controller.deleteRestaurant);

export default router;
