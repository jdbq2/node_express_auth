import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import { Identifier } from "sequelize";
import { PlatformUser } from "../types/types";
import { User } from "../db/models/user.model";

export class UserServices {
    constructor() {}

    async create(data: PlatformUser) {
        const hash = await bcrypt.hash(data.password!, 10);
        const newUser = await User.create({
            ...data,
            password: hash,
        });
        delete newUser.dataValues.password;
        return newUser;
    }

    async find() {
        const rta = await User.findAll();
        const allUsers = rta.map((user) => {
            delete user.dataValues.password;
            return user;
        });
        return allUsers;
    }

    async findByEmail(email: string): Promise<User | null> {
        const rta = await User.findOne({
            where: { email },
        });
        return rta;
    }

    async findOne(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            throw boom.notFound("user not found");
        }
        return user;
    }

    async update(id: number, changes: {}) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id: number) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}
