"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const userRepository = __importStar(require("../repositories/user.repository"));
const createUser = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    // In a real application, you would hash the password here
    return userRepository.create(userData);
};
exports.createUser = createUser;
const getUserById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.getUserById = getUserById;
const getAllUsers = async () => {
    return userRepository.findAll();
};
exports.getAllUsers = getAllUsers;
const updateUser = async (id, userData) => {
    const updatedUser = await userRepository.update(id, userData);
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const deleted = await userRepository.remove(id);
    if (!deleted) {
        throw new Error('User not found');
    }
    return true;
};
exports.deleteUser = deleteUser;
