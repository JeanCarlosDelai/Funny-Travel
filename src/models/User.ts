import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
  role?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public lastName!: string;
  public location!: string;
  public role!: string;

  public createJWT(): string {
    return jwt.sign(
      { userId: this.id, name: this.name, role: this.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_LIFETIME }
    );
  }

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }

  public static associate(models: any) {
    // Defina as associações aqui
  }

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [3, 50],
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 100],
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'lastName',
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'my city',
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user',
        },
      },
      {
        sequelize,
        modelName: 'User',
        hooks: {
          beforeCreate: async (user: User) => {
            if (!user.changed('password')) return;
            const salt = await bcrypt.genSalt(10);
            if (!user.password) {
              throw new Error('A senha não foi definida');
            }
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    );
  }
}

export default User;