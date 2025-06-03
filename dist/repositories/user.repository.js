"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findAll = exports.findByUsername = exports.findByEmail = exports.findById = exports.create = void 0;
const user_entity_1 = require("../entities/user.entity");
const database_1 = require("../../src/config/database");
const userRepository = database_1.AppDataSource.getRepository(user_entity_1.UserEntity);
const create = async (userData) => {
    const user = (0, user_entity_1.createUser)(userData);
    const savedUser = await userRepository.save(user);
    return (0, user_entity_1.sanitizeUser)(savedUser);
};
exports.create = create;
const findById = async (id) => {
    const user = await userRepository.findOneBy({ id });
    return user ? (0, user_entity_1.sanitizeUser)(user) : null;
};
exports.findById = findById;
const findByEmail = async (email) => {
    const user = await userRepository.findOneBy({ email });
    return user ? (0, user_entity_1.sanitizeUser)(user) : null;
};
exports.findByEmail = findByEmail;
const findByUsername = async (username) => {
    const user = await userRepository.findOneBy({ username });
    return user ? (0, user_entity_1.sanitizeUser)(user) : null;
};
exports.findByUsername = findByUsername;
const findAll = async () => {
    const users = await userRepository.find();
    return users.map(user_entity_1.sanitizeUser);
};
exports.findAll = findAll;
const update = async (id, userData) => {
    const user = await userRepository.findOneBy({ id });
    if (!user)
        return null;
    const updatedUser = await userRepository.save({
        ...user,
        ...userData
    });
    return (0, user_entity_1.sanitizeUser)(updatedUser);
};
exports.update = update;
const remove = async (id) => {
    const result = await userRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
};
exports.remove = remove;
