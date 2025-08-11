import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { Restaurant } from "../../../domain/entities/Restaurant";

export class CreateRestaurant {
  constructor(private repo: IRestaurantRepository) {}

  async execute(data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">): Promise<Restaurant> {
    const existing = await this.repo.findByName(data.name);
    if (existing) {
      throw new Error("A restaurant with this name already exists.");
    }
    return this.repo.create(data);
  }
}
