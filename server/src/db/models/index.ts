import { Sequelize } from "sequelize";
import { User, userSchema } from "./user.model";

export const setupModels = (sequelize: Sequelize) => {
    User.init(userSchema, User.config(sequelize));
    User.associate(sequelize.models);
};
