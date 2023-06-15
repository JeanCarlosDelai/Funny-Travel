
import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './User';

interface TravelAttributes {
  id?: number;
  travelName: string;
  location: string;
  description: string;
  characteristics: string;
  price: number;
  image: string;
  createdBy: number;
}

class Travel extends Model<TravelAttributes> implements TravelAttributes {
  public id!: number;
  public travelName!: string;
  public location!: string;
  public description!: string;
  public characteristics!: string;
  public price!: number;
  public image!: string;
  public createdBy!: number;

  public static associate(models: any) {
    Travel.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'user',
    });
  }

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        travelName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 50],
          },
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 100],
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 1000],
          },
        },
        characteristics: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 1000],
          },
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 1000],
          },
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Travel',
        tableName: 'Travels', // Nome da tabela no banco de dados
        timestamps: true,
      }
    );
  }
}

export default Travel;
