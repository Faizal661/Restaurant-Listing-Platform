import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";

export class DeleteRestaurant {
  constructor(private repo: IRestaurantRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
