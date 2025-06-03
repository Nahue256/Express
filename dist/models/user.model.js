"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = ({ id, username, email, password, createdAt = new Date() }) => {
    const user = {
        id,
        username,
        email,
        password,
        createdAt
    };
    return {
        ...user,
        toJSON: () => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    };
};
exports.createUser = createUser;
