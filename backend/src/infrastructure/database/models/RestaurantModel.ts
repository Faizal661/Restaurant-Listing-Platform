import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class RestaurantModel extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public contact!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RestaurantModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Restaurant", timestamps: true }
);
