import request from 'supertest';
import { config } from 'dotenv';
import { resolve } from 'path';
import { app } from '../../app';
import { createMultipleTestUsers, createTestUser, getUserRepository } from '../utils';
import { User } from '../../entities/user.entity';
import { AppDataSource } from '../../config/database';

// Load test environment variables
config({ path: resolve(__dirname, '../../../.env.test') });

beforeAll(async () => {
  // Ensure we're using test database configuration
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  // Drop all tables and recreate schema
  await AppDataSource.synchronize(true);
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    // Drop all tables before closing connection
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  }
});

beforeEach(async () => {
  // Drop all tables and recreate schema before each test
  await AppDataSource.synchronize(true);
});

afterEach(async () => {
  // Clean all tables after each test
  const entities = AppDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.clear();
  }
});

describe('User Endpoints', () => {
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user.username).toBe(userData.username);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('should not create a user with duplicate email', async () => {
      const userData = {
        username: 'testuser1',
        email: 'duplicate@example.com',
        password: 'password123'
      };

      // Create first user
      await createTestUser(userData);

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with this email already exists');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Create test users
      await createMultipleTestUsers();

      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.data.users)).toBe(true);
      expect(response.body.data.users.length).toBe(3);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const user = await createTestUser();

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user.id).toBe(user.id);
      expect(response.body.data.user.username).toBe(user.username);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/f20b62c1-8865-4aba-9704-482ec1bbcad4')
        .expect(404);

      expect(response.body.status).toBe('error');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const user = await createTestUser();
      const updateData = {
        username: 'updated_username'
      };

      const response = await request(app)
        .put(`/api/users/${user.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('User successfully updated');
      expect(response.body.data.user.username).toBe(updateData.username);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const user = await createTestUser();

      await request(app)
        .delete(`/api/users/${user.id}`)
        .expect(200);

      // Verify user is deleted
      const userRepository = getUserRepository();
      const deletedUser = await userRepository.findOneBy({ id: user.id });
      expect(deletedUser).toBeNull();
    });
  });
}); 