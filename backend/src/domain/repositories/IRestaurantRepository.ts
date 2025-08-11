import { Restaurant } from "../entities/Restaurant";

export interface IRestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(id: number): Promise<Restaurant | null>;
  findByName(name: string): Promise<Restaurant | null>;
  create(data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">): Promise<Restaurant>;
  update(id: number, data: Partial<Restaurant>): Promise<Restaurant | null>;
  delete(id: number): Promise<boolean>;
}
