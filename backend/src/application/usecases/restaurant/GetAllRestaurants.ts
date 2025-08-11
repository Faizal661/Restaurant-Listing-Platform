import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { Restaurant } from "../../../domain/entities/Restaurant";

export class GetAllRestaurants {
  constructor(private repo: IRestaurantRepository) {}

  async execute(): Promise<Restaurant[]> {
    return this.repo.findAll();
  }
}
