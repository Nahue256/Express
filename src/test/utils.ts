import { AppDataSource } from '../config/database';
import { User, UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

export const getUserRepository = (): Repository<User> => {
  return AppDataSource.getRepository(UserEntity);
};

export const createTestUser = async (userData: Partial<User> = {}): Promise<User> => {
  const repository = getUserRepository();
  const defaultUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
  };

  const user = await repository.save({
    ...defaultUser,
    ...userData
  });

  return user;
}; 

export const createMultipleTestUsers = async (userData: Partial<User> = {}): Promise<User[]> => {
  const repository = getUserRepository();
  const defaultUser = {
    username: `testuser_1`,
    email: `test_1@example.com`,
    password: 'password123'
  };
  const defaultUser2 = {
    username: `testuser_2`,
    email: `test_2@example.com`,
    password: 'password123'
  };
  const defaultUser3 = {
    username: `testuser_3`,
    email: `test_3@example.com`,
    password: 'password123'
  };

  const user = await repository.save({
    ...defaultUser,
    ...userData
  });
  const user2 = await repository.save({
    ...defaultUser2,
    ...userData
  });
  const user3 = await repository.save({
    ...defaultUser3,
    ...userData
  });

  return [user, user2, user3];
}; 