import { EntitySchema } from 'typeorm';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid'
    },
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at'
    }
  }
});

// Helper function to create a user object
export const createUser = (data: Partial<User>): Partial<User> => {
  return {
    username: data.username || '',
    email: data.email || '',
    password: data.password || ''
  };
};

// Helper function to sanitize user data (remove password)
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}; 