import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { Restaurant } from "../../../domain/entities/Restaurant";
import { RestaurantModel } from "../models/RestaurantModel";

export class RestaurantRepositoryImpl implements IRestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.findAll();
    return restaurants.map(r => new Restaurant(r.id, r.name, r.address, r.contact, r.createdAt, r.updatedAt));
  }

  async findById(id: number): Promise<Restaurant | null> {
    const r = await RestaurantModel.findByPk(id);
    return r ? new Restaurant(r.id, r.name, r.address, r.contact, r.createdAt, r.updatedAt) : null;
  }

  async findByName(name: string): Promise<Restaurant | null> {
    const r = await RestaurantModel.findOne({ where: { name } });
    return r ? new Restaurant(r.id, r.name, r.address, r.contact, r.createdAt, r.updatedAt) : null;
  }

  async create(data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">): Promise<Restaurant> {
    const r = await RestaurantModel.create(data as any);
    return new Restaurant(r.id, r.name, r.address, r.contact, r.createdAt, r.updatedAt);
  }

  async update(id: number, data: Partial<Restaurant>): Promise<Restaurant | null> {
    const r = await RestaurantModel.findByPk(id);
    if (!r) return null;
    await r.update(data);
    return new Restaurant(r.id, r.name, r.address, r.contact, r.createdAt, r.updatedAt);
  }

  async delete(id: number): Promise<boolean> {
    const r = await RestaurantModel.findByPk(id);
    if (!r) return false;
    await r.destroy();
    return true;
  }
}
