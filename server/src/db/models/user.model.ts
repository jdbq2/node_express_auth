import { DataTypes, Sequelize, Model, ModelStatic } from "sequelize";

export const USER_TABLE = "users";
export const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "customer",
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
};

export class User extends Model {
    static associate(models: { [key: string]: ModelStatic<Model> }) {
        //----Aca van las asociaciones
    }
    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false,
        };
    }
}
