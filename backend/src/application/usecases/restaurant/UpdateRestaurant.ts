import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { Restaurant } from "../../../domain/entities/Restaurant";

export class UpdateRestaurant {
  constructor(private repo: IRestaurantRepository) {}

  async execute(id: number, data: Partial<Restaurant>): Promise<Restaurant | null> {
    return this.repo.update(id, data);
  }
}
