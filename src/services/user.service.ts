import { IUser, UserCreateInput, UserUpdateInput } from '../interfaces/user.interface';
import * as userRepository from '../repositories/user.repository';

export const createUser = async (userData: UserCreateInput): Promise<IUser> => {
  const existingUserEmail = await userRepository.findByEmail(userData.email);
  const existingUsername = await userRepository.findByUsername(userData.username)
  if (existingUserEmail) {
    throw new Error('User with this email already exists');
  }
  if (existingUsername) {
    throw new Error('User with this username already exists');
  }

  return userRepository.create(userData);
};

export const getUserById = async (id: string): Promise<IUser> => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return userRepository.findAll();
};

export const updateUser = async (id: string, userData: UserUpdateInput): Promise<IUser> => {
  const updatedUser = await userRepository.update(id, userData);
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const deleted = await userRepository.remove(id);
  if (!deleted) {
    throw new Error('User not found');
  }
  return true;
}; 