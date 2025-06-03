import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'express_db',
  synchronize: true, // Be careful with this in production
  logging: false,
  entities: [UserEntity],
  subscribers: [],
  migrations: []
}); 