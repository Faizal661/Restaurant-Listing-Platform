import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database.js';

interface RestaurantAttributes extends InferAttributes<Restaurant> {}
interface RestaurantCreationAttributes extends InferCreationAttributes<Restaurant> {}

class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> {
  public id!: number;
  public name!: string;
  public address!: string;
  public contact!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Restaurant',
    timestamps: true
  }
);

export default Restaurant;