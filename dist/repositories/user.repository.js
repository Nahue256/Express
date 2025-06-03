"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findAll = exports.findByEmail = exports.findById = exports.create = void 0;
const user_model_1 = require("../models/user.model");
// In-memory store
const users = new Map();
const create = async (userData) => {
    const id = Date.now().toString();
    const user = (0, user_model_1.createUser)({ id, ...userData, createdAt: new Date() });
    users.set(id, user);
    return user;
};
exports.create = create;
const findById = async (id) => {
    return users.get(id) || null;
};
exports.findById = findById;
const findByEmail = async (email) => {
    return Array.from(users.values()).find(user => user.email === email) || null;
};
exports.findByEmail = findByEmail;
const findAll = async () => {
    return Array.from(users.values());
};
exports.findAll = findAll;
const update = async (id, userData) => {
    const existingUser = await (0, exports.findById)(id);
    if (!existingUser)
        return null;
    const updatedUser = (0, user_model_1.createUser)({ ...existingUser, ...userData, id });
    users.set(id, updatedUser);
    return updatedUser;
};
exports.update = update;
const remove = async (id) => {
    const user = await (0, exports.findById)(id);
    if (!user)
        return false;
    return users.delete(id);
};
exports.remove = remove;
